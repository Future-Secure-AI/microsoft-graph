/**
 * Stream the content of a drive item as a Node.js readable stream.
 * @module streamDriveItemContent
 * @category Operations
 */

import type { DriveItemRef } from "../../models/DriveItem.ts";
import { executeHttpRequest } from "../../services/http.ts";
import { endpoint } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Stream the content of a drive item.
 *
 * @param itemRef Reference to the drive item to be streamed.
 * @returns A Node.js readable stream of the drive item content.
 * @throws Error if the download fails or the response is not a stream.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-get-content
 */
export default async function streamDriveItemContent(itemRef: DriveItemRef): Promise<NodeJS.ReadableStream> {
	const url = `${endpoint}${generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/content", itemRef)}`;
	const accessToken = await itemRef.context.generateAccessToken();

	const response = await executeHttpRequest({
		url,
		method: "GET",
		headers: {
			authorization: `Bearer ${accessToken}`,
		},
		responseType: "stream",
	});

	if (!response || typeof response.data?.pipe !== "function") {
		throw new Error("Failed to get a streamable response");
	}

	return response.data;
}
