/**
 * Creates a new drive item in the specified parent drive or folder using a stream as content.
 * @module createDriveItemContent
 * @category Operations
 */

import type { DriveItem } from "@microsoft/microsoft-graph-types";
import InvalidArgumentError from "../../errors/InvalidArgumentError.ts";
import ProtocolError from "../../errors/ProtocolError.ts";
import type { DriveRef } from "../../models/Drive.ts";
import type { DriveItemId, DriveItemPath, DriveItemRef } from "../../models/DriveItem.ts";
import { createDriveItemRef } from "../../services/driveItem.ts";
import { execute } from "../../services/http.ts";
import { endpoint } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** "Use a byte range size that is a multiple of 320 KiB (327,680 bytes). Failing to use a fragment size that is a multiple of 320 KiB can result in large file transfers failing after the last byte range is uploaded." */
const CHUNK_SIZE_MULTIPLE = 320 * 1024;
const defaultChunkSize = CHUNK_SIZE_MULTIPLE * 32;

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
 * Creates a new drive item in the specified parent drive or folder using a stream as content.
 * @param parentRef Reference to the parent drive or folder where the drive item will be created.
 * @param itemPath Path (including the filename) for the new drive item within the given parent.
 * @param contentStream A Node.js readable stream containing the file content.
 * @param totalSize The total size in bytes of the content to be uploaded.
 * @param options Optional. Additional options for the upload operation.
 * @param options.conflictBehavior Optional. Specifies how to handle conflicts if the file already exists. Default is 'fail'.
 * @param options.chunkSize Optional. The size of each chunk to be uploaded in bytes. Default is 10MB.
 * @param options.progress Optional. A callback function that is called periodically with the upload progress as a percentage.
 * @returns The newly created drive item.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-createuploadsession
 * @see https://learn.microsoft.com/en-us/graph/api/resources/uploadsession
 */
export interface CreateDriveItemContentOptions {
	conflictBehavior?: "fail" | "replace" | "rename";
	chunkSize?: number;
	progress?: (pct: number) => void;
}

export default async function createDriveItemContent(parentRef: DriveRef | DriveItemRef, itemPath: DriveItemPath, contentStream: NodeJS.ReadableStream, totalSize: number, options: CreateDriveItemContentOptions = {}): Promise<DriveItem & DriveItemRef> {
	const { conflictBehavior = "fail", chunkSize = defaultChunkSize, progress } = options;

	if (chunkSize % CHUNK_SIZE_MULTIPLE !== 0) {
		throw new InvalidArgumentError(`Chunk size (${chunkSize.toLocaleString()}) must be a multiple of ${(CHUNK_SIZE_MULTIPLE / 1024).toLocaleString()} KiB *${CHUNK_SIZE_MULTIPLE.toLocaleString()} bytes).`);
	}

	const pathSegment = (parentRef as DriveItemRef).itemId ? "items/{item-id}" : "root";
	const uploadSessionUrl = `${endpoint}${generatePath(`/sites/{site-id}/drives/{drive-id}/${pathSegment}:/${itemPath}:/createUploadSession`, parentRef)}`;
	const accessToken = await parentRef.context.generateAccessToken();
	const fileName = itemPath.split("/").pop();

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

	let position = 0;
	let driveItem: DriveItem | null = null;

	// Efficient streaming: read and upload chunks directly from the stream
	const reader = contentStream[Symbol.asyncIterator] ? contentStream[Symbol.asyncIterator]() : null;
	if (!reader) {
		throw new InvalidArgumentError("contentStream is not an async iterable");
	}

	let buffer = Buffer.alloc(0);
	while (position < totalSize) {
		while (buffer.length < chunkSize && position + buffer.length < totalSize) {
			const { value, done } = await reader.next();
			if (done) break;
			const chunk = Buffer.isBuffer(value) ? value : Buffer.from(value);
			buffer = Buffer.concat([buffer, chunk]);
		}
		const thisChunk = buffer.subarray(0, chunkSize);
		const start = position;
		const end = position + thisChunk.length - 1;
		const contentRange = `bytes ${start}-${end}/${totalSize}`;

		const res = await execute<ChunkResponse>({
			url: uploadUrl,
			method: "PUT",
			headers: {
				"Content-Length": thisChunk.length.toString(),
				"Content-Range": contentRange,
			},
			data: thisChunk,
			responseType: "json",
		});
		position += thisChunk.length;
		if (progress && totalSize > 0) {
			progress(Math.min(100, (position / totalSize) * 100));
		}
		buffer = buffer.subarray(chunkSize);
		if (isDriveItem(res)) {
			driveItem = res;
			break;
		}
	}

	if (!driveItem) {
		throw new ProtocolError(`Upload did not complete successfully. Last position: ${position}`);
	}
	const itemRef = createDriveItemRef(parentRef, (driveItem as DriveItem).id as DriveItemId);
	return {
		...(driveItem as DriveItem),
		...itemRef,
	};

	function isDriveItem(obj: unknown): obj is DriveItem {
		return typeof obj === "object" && obj !== null && "id" in obj;
	}
}
