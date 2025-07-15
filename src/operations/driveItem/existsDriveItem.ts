/**
 * Check if a given drive item exists.
 * @module existsDriveItem
 * @category Operations
 */

import InvalidArgumentError from "../../errors/InvalidArgumentError.ts";
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
	if (!itemPath.startsWith("/")) {
		throw new InvalidArgumentError("itemPath must start with a forward slash (/)");
	}

	const url = `${endpoint}${generatePath(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}`, driveRef)}`;
	const accessToken = await driveRef.context.generateAccessToken();

	const response = await executeRaw({ // TODO: This is not supporting retry and needs fixing
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
