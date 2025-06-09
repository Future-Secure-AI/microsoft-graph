import { endpoint } from "../../graphApi.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import { executeHttpRequest } from "../../services/http.ts";
import { isHttpSuccess } from "../../services/httpStatus.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Download the content of a drive item.
 *
 * @param itemRef Reference to the drive item to be downloaded.
 * @returns The content of the drive item as an ArrayBuffer.
 * @throws Error if the download fails.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-get-content
 */
export default async function getDriveItemContent(itemRef: DriveItemRef): Promise<ArrayBuffer> {
	// Note this method doesn't match the standard pattern since the batching library doesn't support non-JSON return types, and there appears to be no value in adding support.
	const url = `${endpoint}${generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/content", itemRef)}`;
	const accessToken = await itemRef.context.generateAccessToken();

	const response = await executeHttpRequest({
		url,
		method: "GET",
		headers: {
			authorization: `Bearer ${accessToken}`,
		},
		responseType: "arraybuffer",
	});

	if (!isHttpSuccess(response.status)) {
		throw new Error(`Failed to download file: ${response.status} ${response.statusText}`);
	}

	if (!Buffer.isBuffer(response.data)) {
		throw new Error(`Unexpected response type: ${typeof response.data}`);
	}

	const buffer = response.data.buffer.slice(response.data.byteOffset, response.data.byteOffset + response.data.byteLength);

	if (!(buffer instanceof ArrayBuffer)) {
		throw new Error("Failed to convert Buffer to ArrayBuffer");
	}

	return buffer;
}
