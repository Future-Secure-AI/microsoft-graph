/**
 * Creates a new drive item in the specified parent drive or folder using a stream as content.
 * @module createDriveItemContent
 * @category Operations
 */

import type { DriveItem } from "@microsoft/microsoft-graph-types";
import type { DriveRef } from "../../models/Drive.ts";
import type { DriveItemId, DriveItemPath, DriveItemRef } from "../../models/DriveItem.ts";
import { createDriveItemRef } from "../../services/driveItem.ts";
import { executeHttpRequest } from "../../services/http.ts";
import { endpoint, throwException } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Creates a new drive item in the specified parent drive or folder using a stream as content.
 * @param parentRef Reference to the parent drive or folder where the drive item will be created.
 * @param itemPath Path (including the filename) for the new drive item within the given parent.
 * @param contextType The MIME type of the content being uploaded.
 * @param contentStream A Node.js readable stream containing the file content.
 * @returns The newly created drive item.
 * @remarks If the file already exists, it will be replaced.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-put-content
 */
export default async function createDriveItemContent(parentRef: DriveRef | DriveItemRef, itemPath: DriveItemPath, contextType: string, contentStream: NodeJS.ReadableStream): Promise<DriveItem & DriveItemRef> {
	const pathSegment = (parentRef as DriveItemRef).itemId ? "items/{item-id}" : "root";
	const url = `${endpoint}${generatePath(`/sites/{site-id}/drives/{drive-id}/${pathSegment}:/${itemPath}:/content`, parentRef)}`;
	const accessToken = await parentRef.context.generateAccessToken();

	const response = await executeHttpRequest({
		url,
		method: "PUT",
		headers: {
			authorization: `Bearer ${accessToken}`,
			"content-type": contextType,
		},
		data: contentStream,
		responseType: "json",
	});

	if (!response || typeof response.status !== "number" || response.status < 200 || response.status >= 300) {
		throwException(response?.status ?? 500, "Failed to upload content");
	}

	const driveItem = response.data as DriveItem;
	const itemRef = createDriveItemRef(parentRef, driveItem.id as DriveItemId);
	return {
		...driveItem,
		...itemRef,
	};
}
