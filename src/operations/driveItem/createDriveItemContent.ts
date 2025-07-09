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
import { executeHttpRequest } from "../../services/http.ts";
import { isRetryable } from "../../services/httpStatus.ts";
import { endpoint, throwException } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

const chunkSize = 10 * 1024 * 1024;

/**
 * Creates a new drive item in the specified parent drive or folder using a stream as content.
 * @param parentRef Reference to the parent drive or folder where the drive item will be created.
 * @param itemPath Path (including the filename) for the new drive item within the given parent.
 * @param contentStream A Node.js readable stream containing the file content.
 * @param conflictBehavior Optional. Specifies how to handle conflicts if the file already exists. Default is 'fail'.
 * @returns The newly created drive item.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-createuploadsession
 * @see https://learn.microsoft.com/en-us/graph/api/resources/uploadsession
 */
export default async function createDriveItemContent(parentRef: DriveRef | DriveItemRef, itemPath: DriveItemPath, contentStream: NodeJS.ReadableStream, conflictBehavior: "fail" | "replace" | "rename" = "fail"): Promise<DriveItem & DriveItemRef> {
	const pathSegment = (parentRef as DriveItemRef).itemId ? "items/{item-id}" : "root";
	const uploadSessionUrl = `${endpoint}${generatePath(`/sites/{site-id}/drives/{drive-id}/${pathSegment}:/${itemPath}:/createUploadSession`, parentRef)}`;
	const accessToken = await parentRef.context.generateAccessToken();

	// Step 1: Create upload session
	const sessionResponse = await executeHttpRequest({
		url: uploadSessionUrl,
		method: "POST",
		headers: {
			authorization: `Bearer ${accessToken}`,
			"content-type": "application/json",
		},
		data: JSON.stringify({
			item: {
				"@microsoft.graph.conflictBehavior": conflictBehavior,
				name: itemPath.split("/").pop(),
			},
		}),
		responseType: "json",
	});

	if (!sessionResponse || typeof sessionResponse.status !== "number" || sessionResponse.status < 200 || sessionResponse.status >= 300) {
		throwException(sessionResponse?.status ?? 500, "Failed to create upload session");
	}

	const uploadUrl = sessionResponse.data.uploadUrl;
	if (!uploadUrl) {
		throw new ProtocolError("Upload session URL missing");
	}

	// Step 2: Chunked upload
	let buffer = Buffer.alloc(0);
	let position = 0;
	let isDone = false;
	let driveItem: DriveItem | null = null;

	const readChunk = async () => {
		while (buffer.length < chunkSize && !isDone) {
			const chunkRaw = contentStream.read(chunkSize - buffer.length);
			let chunk: Buffer | null = null;
			if (chunkRaw === null) {
				await new Promise<void>((resolve) => contentStream.once("readable", resolve));
				const nextRaw = contentStream.read(chunkSize - buffer.length);
				if (nextRaw === null) {
					isDone = true;
					break;
				}
				chunk = Buffer.isBuffer(nextRaw) ? nextRaw : Buffer.from(nextRaw);
			} else {
				chunk = Buffer.isBuffer(chunkRaw) ? chunkRaw : Buffer.from(chunkRaw);
			}
			if (chunk) {
				buffer = Buffer.concat([buffer, chunk]);
			}
		}
		return buffer.slice(0, chunkSize);
	};

	contentStream.on("end", () => {
		isDone = true;
	});

	while (!isDone || buffer.length > 0) {
		const chunk = await readChunk();
		if (chunk.length === 0) break;
		let retries = 0;
		const maxRetries = 5;
		let uploaded = false;

		while (!uploaded && retries < maxRetries) {
			const start = position;
			const end = position + chunk.length - 1;
			const headers: Record<string, string> = {
				"Content-Length": chunk.length.toString(),
				"Content-Range": `bytes ${start}-${end}/*`,
			};
			try {
				const uploadResponse = await executeHttpRequest({
					url: uploadUrl,
					method: "PUT",
					headers,
					data: chunk,
					responseType: "json",
				});
				if (uploadResponse.status === 201 || uploadResponse.status === 200) {
					driveItem = uploadResponse.data as DriveItem;
					uploaded = true;
					break;
				} else if (uploadResponse.status === 202) {
					// Continue uploading next chunk
					uploaded = true;
					break;
				} else if (isRetryable(uploadResponse.status)) {
					retries++;
					await new Promise((res) => setTimeout(res, 2 ** retries * 100));
				} else {
					throwException(uploadResponse.status, "Failed to upload chunk");
				}
			} catch (err) {
				retries++;
				if (retries >= maxRetries) throwException(500, `Chunk upload failed after ${maxRetries} retries: ${err instanceof Error ? err.message : String(err)}`);
				await new Promise((res) => setTimeout(res, 2 ** retries * 100));
			}
		}
		position += chunk.length;
		buffer = buffer.slice(chunk.length);
	}

	if (!driveItem) throwException(500, "Upload did not complete successfully");
	const itemRef = createDriveItemRef(parentRef, driveItem.id as DriveItemId);
	return {
		...driveItem,
		...itemRef,
	};
}
