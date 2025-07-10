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

const chunkSize = 10 * 1024 * 1024;

type SessionResponse = {
	uploadUrl: string;
	expirationDateTime: string;
};
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
	const uploadUrlBase = `${endpoint}${generatePath(`/sites/{site-id}/drives/{drive-id}/${pathSegment}:/${itemPath}:/content`, parentRef)}`;
	const uploadSessionUrl = `${endpoint}${generatePath(`/sites/{site-id}/drives/{drive-id}/${pathSegment}:/${itemPath}:/createUploadSession`, parentRef)}`;
	const accessToken = await parentRef.context.generateAccessToken();
	const fileName = itemPath.split("/").pop();

	// Buffer the stream to determine size
	const buffer = await streamToBuffer(contentStream);
	if (buffer.length < 4 * 1024 * 1024) {
		// Small file: upload directly
		const res = await execute<DriveItem>({
			url: uploadUrlBase,
			method: "PUT",
			headers: {
				authorization: `Bearer ${accessToken}`,
				"content-type": "application/octet-stream",
				"content-length": buffer.length.toString(),
				"if-none-match": conflictBehavior === "fail" ? "*" : undefined,
			},
			data: buffer,
			responseType: "json",
		});
		const itemRef = createDriveItemRef(parentRef, res.id as DriveItemId);
		return { ...res, ...itemRef };
	}

	// Large file: use upload session (chunked)
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
	while (position < buffer.length) {
		const chunk = buffer.slice(position, position + chunkSize);
		const start = position;
		const end = position + chunk.length - 1;
		const contentRange = `bytes ${start}-${end}/${buffer.length}`;
		const res = await execute<DriveItem | { nextExpectedRanges?: string[] }>({
			url: uploadUrl,
			method: "PUT",
			headers: {
				"Content-Length": chunk.length.toString(),
				"Content-Range": contentRange,
			},
			data: chunk,
			responseType: "json",
		});
		position += chunk.length;
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

async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
	const chunks: Uint8Array[] = [];
	await new Promise<void>((resolve, reject) => {
		stream.on("data", (chunk) => {
			if (typeof chunk === "string") {
				chunks.push(Buffer.from(chunk));
			} else {
				chunks.push(chunk);
			}
		});
		stream.on("end", resolve);
		stream.on("error", reject);
	});
	return Buffer.concat(chunks);
}
