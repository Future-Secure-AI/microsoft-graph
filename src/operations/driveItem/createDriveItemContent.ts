/**
 * Creates a new drive item in the specified parent drive or folder using a stream as content.
 * @module createDriveItemContent
 * @category Operations
 */

import type { DriveItem } from "@microsoft/microsoft-graph-types";
import ProtocolError from "../../errors/ProtocolError.ts";
import type { DriveRef } from "../../models/Drive.ts";
import type { DriveItemId, DriveItemPath, DriveItemRef } from "../../models/DriveItem.ts";
import { createDriveItemRef } from "../../services/driveItem.ts";
import { execute } from "../../services/http.ts";
import { endpoint } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

const defaultChunkSize = 10 * 1024 * 1024;

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
 * @param conflictBehavior Optional. Specifies how to handle conflicts if the file already exists. Default is 'fail'.
 * @returns The newly created drive item.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-createuploadsession
 * @see https://learn.microsoft.com/en-us/graph/api/resources/uploadsession
 */
export default async function createDriveItemContent(parentRef: DriveRef | DriveItemRef, itemPath: DriveItemPath, contentStream: NodeJS.ReadableStream, totalSize: number, conflictBehavior: "fail" | "replace" | "rename" = "fail", chunkSize = defaultChunkSize): Promise<DriveItem & DriveItemRef> {
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
	let streamEnded = false;
	const chunks: Buffer[] = [];

	contentStream.on("data", (chunk) => {
		chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
	});
	contentStream.on("end", () => {
		streamEnded = true;
	});
	contentStream.on("error", () => {
		// error will be handled in readChunk
	});

	let chunk: Buffer | null = await readChunk();
	while (chunk !== null) {
		let currentChunk = chunk;
		while (currentChunk.length > 0) {
			const thisChunk = currentChunk.subarray(0, chunkSize);
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
			currentChunk = currentChunk.subarray(chunkSize);
			if (isDriveItem(res)) {
				driveItem = res;
				break;
			}
		}
		if (driveItem) break;
		chunk = await readChunk();
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

	function readChunk(): Promise<Buffer | null> {
		return new Promise((resolve, reject) => {
			if (chunks.length > 0) {
				const next = chunks.shift();
				return resolve(next ?? null);
			}
			if (streamEnded) return resolve(null);
			contentStream.once("data", (chunk) => {
				resolve(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
			});
			contentStream.once("end", () => {
				streamEnded = true;
				resolve(null);
			});
			contentStream.once("error", (err) => {
				reject(err);
			});
		});
	}
}
