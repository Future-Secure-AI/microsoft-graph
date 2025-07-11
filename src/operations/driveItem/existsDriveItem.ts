/**
 * Check if a given drive item exists.
 * @module existsDriveItem
 * @category Operations
 */

import type { DriveRef } from "../../models/Drive.ts";
import type { DriveItemPath } from "../../models/DriveItem.ts";
import { executeRaw } from "../../services/http.ts";
import { isHttpNotFound, isHttpOk } from "../../services/httpStatus.ts";
import { endpoint } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Check if a given drive item exists.
 * @param driveRef Reference to the drive item to be downloaded.
 * @returns If the drive item exists.
 */
export default async function existsDriveItem(driveRef: DriveRef, itemPath: DriveItemPath): Promise<boolean> {
	// Note this method doesn't match the standard pattern since the batching library doesn't support non-JSON return types.
	const url = `${endpoint}${generatePath(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}`, driveRef)}`;
	const accessToken = await driveRef.context.generateAccessToken();

	const response = await executeRaw({
		url,
		method: "GET",
		headers: {
			authorization: `Bearer ${accessToken}`,
		},
	});

	if (isHttpOk(response.status)) {
		return true;
	}

	if (isHttpNotFound(response.status)) {
		return false;
	}

	throw new Error(`Unexpected response status: ${response.status} ${response.statusText}`);
}
