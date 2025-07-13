/**
 * Attempts to retrieve the metadata for an item in a drive by file path, returning null if the item does not exist.
 * @module tryGetDriveItemByPath
 * @category Tasks
 */
import type { DriveItem } from "@microsoft/microsoft-graph-types";
import type { DriveRef } from "../models/Drive.ts";
import type { DriveItemPath, DriveItemRef } from "../models/DriveItem.ts";
import getDriveItemByPath from "../operations/driveItem/getDriveItemByPath.ts";
import { isErrorWithName } from "../services/error.ts";

/**
 * Attempts to retrieve the metadata for an item in a drive or folder by file path.
 * Returns null if the item does not exist (NotFoundError).
 * @param parentRef Reference to the drive or folder containing the item.
 * @param itemPath Path of the item within the drive.
 * @returns The metadata of the specified drive item, or null if not found.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-get
 */
export default async function tryGetDriveItemByPath(parentRef: DriveRef | DriveItemRef, itemPath: DriveItemPath): Promise<(DriveItem & DriveItemRef) | null> {
	try {
		return await getDriveItemByPath(parentRef, itemPath);
	} catch (error) {
		if (isErrorWithName(error, "NotFoundError")) {
			return null;
		}
		throw error;
	}
}
