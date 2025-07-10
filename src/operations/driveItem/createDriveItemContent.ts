/**
 * Creates a new drive item in the specified parent drive or folder using a stream as content.
 * @module createDriveItemContent
 * @category Operations
 */

import type { DriveItem } from "@microsoft/microsoft-graph-types";
import { basename } from "path";
import InvalidArgumentError from "../../errors/InvalidArgumentError.ts";
import ProtocolError from "../../errors/ProtocolError.ts";
import type { DriveRef } from "../../models/Drive.ts";
import type { DriveItemId, DriveItemPath, DriveItemRef } from "../../models/DriveItem.ts";
import { createDriveItemRef } from "../../services/driveItem.ts";
import { execute } from "../../services/http.ts";
import { endpoint } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * The required chunk size multiple for upload sessions.
 * @remarks Microsoft Graph requires that each upload chunk is a multiple of 320 KiB (327,680 bytes).
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-createuploadsession
 */
export const chunkSizeMultiple = 320 * 1024;

const defaultChunkSize = chunkSizeMultiple * 32;

type SessionResponse = {
	uploadUrl: string;
	expirationDateTime: string;
};
type ChunkResponse =
	| DriveItem
	| {
			nextExpectedRanges?: string[];
	  };

/**
 * Options for creating a drive item with content upload.
 * @property conflictBehavior Optional. Specifies how to handle conflicts if the file already exists. Can be 'fail', 'replace', or 'rename'.
 * @property chunkSize Optional. The size of each upload chunk in bytes. Must be a multiple of 320 KiB (327,680 bytes).
 * @property progress Optional. Callback function called with the number of bytes uploaded after each chunk.
 */
export interface CreateDriveItemContentOptions {
	conflictBehavior?: "fail" | "replace" | "rename";
	chunkSize?: number;
	progress?: (bytes: number) => void;
}

/**
 * Creates a new drive item in the specified parent drive or folder using a stream as content.
 * @param parentRef Reference to the parent drive or folder where the drive item will be created.
 * @param itemPath Path (including the filename) for the new drive item within the given parent.
 * @param contentStream A Node.js readable stream containing the file content.
 * @param contentLength The total size in bytes of the content to be uploaded.
 * @param options Optional. Additional options for the upload operation.
 * @param options.conflictBehavior Optional. Specifies how to handle conflicts if the file already exists. Default is 'fail'.
 * @param options.chunkSize Optional. The size of each chunk to be uploaded in bytes. Default is 10MB.
 * @param options.progress Optional. A callback function that is called with the number of bytes uploaded after each chunk.
 * @returns The newly created drive item.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-createuploadsession
 * @see https://learn.microsoft.com/en-us/graph/api/resources/uploadsession
 */
export default async function createDriveItemContent(parentRef: DriveRef | DriveItemRef, itemPath: DriveItemPath, contentStream: NodeJS.ReadableStream, contentLength: number, options: CreateDriveItemContentOptions = {}): Promise<DriveItem & DriveItemRef> {
	const { conflictBehavior = "fail", chunkSize = defaultChunkSize, progress = () => {} } = options;

	if (chunkSize % chunkSizeMultiple !== 0) {
		throw new InvalidArgumentError(`Chunk size (${chunkSize.toLocaleString()}) must be a multiple of ${(chunkSizeMultiple / 1024).toLocaleString()} KiB *${chunkSizeMultiple.toLocaleString()} bytes).`);
	}

	const pathSegment = (parentRef as DriveItemRef).itemId ? "items/{item-id}" : "root";
	const uploadSessionUrl = `${endpoint}${generatePath(`/sites/{site-id}/drives/{drive-id}/${pathSegment}:/${itemPath}:/createUploadSession`, parentRef)}`;
	const accessToken = await parentRef.context.generateAccessToken();
	const fileName = basename(itemPath);

	const { uploadUrl } = await execute<SessionResponse>({
		url: uploadSessionUrl,
		method: "POST",
		headers: {
			authorization: `Bearer ${accessToken}`,
			"content-type": "application/json",
		},
		data: JSON.stringify({
			item: {
				"@microsoft.graph.conflictBehavior": conflictBehavior,
				name: fileName,
			},
		}),
		responseType: "json",
	});

	const reader = contentStream[Symbol.asyncIterator] ? contentStream[Symbol.asyncIterator]() : null;
	if (!reader) {
		throw new InvalidArgumentError("contentStream is not an async iterable");
	}

	let contentPosition = 0;
	let item: DriveItem | null = null;
	while (contentPosition < contentLength) {
		const chunk = await readChunk(contentPosition, contentLength, chunkSize, reader);
		const chunkStart = contentPosition;
		const chunkEnd = contentPosition + chunk.length - 1;

		const response = await execute<ChunkResponse>({
			url: uploadUrl,
			method: "PUT",
			headers: {
				"Content-Length": `${chunk.length}`,
				"Content-Range": `bytes ${chunkStart}-${chunkEnd}/${contentLength}`,
			},
			data: chunk,
			responseType: "json",
		});

		contentPosition += chunk.length;

		progress(contentPosition);

		if (isDriveItem(response)) {
			item = response;
			break;
		}
	}

	if (!item) {
		throw new ProtocolError(`Upload did not complete successfully. Last position: ${contentPosition}`);
	}

	const itemRef = createDriveItemRef(parentRef, item.id as DriveItemId);

	return {
		...item,
		...itemRef,
	};

	function isDriveItem(obj: unknown): obj is DriveItem {
		return typeof obj === "object" && obj !== null && "id" in obj;
	}

	async function readChunk(contentPosition: number, contentLength: number, maxLength: number, reader: AsyncIterableIterator<string | Buffer<ArrayBufferLike>>): Promise<Buffer> {
		const buffer = Buffer.alloc(Math.min(maxLength, contentLength - contentPosition));
		let length = 0;
		while (length < maxLength && contentPosition + length < contentLength) {
			const { value, done } = await reader.next();
			if (done) break;
			const chunk = Buffer.isBuffer(value) ? value : Buffer.from(value);
			const toCopy = Math.min(chunk.length, maxLength - length, contentLength - contentPosition - length);
			chunk.copy(buffer, length, 0, toCopy);
			length += toCopy;
		}
		return buffer;
	}
}
