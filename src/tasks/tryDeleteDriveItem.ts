import type { DriveItemRef } from "../models/DriveItemRef.ts";
import deleteDriveItem from "../operations/driveItem/deleteDriveItem.ts";

/**
 * Attempts to delete a DriveItem, returning a boolean indicating success or failure.
 *
 * @param driveItemRef - A reference to the DriveItem to delete.
 * @returns A boolean indicating whether the DriveItem was successfully deleted.
 */
export default async function tryDeleteDriveItem(driveItemRef: DriveItemRef): Promise<boolean> {
	try {
		await deleteDriveItem(driveItemRef);
		return true;
	} catch (_) {
		return false;
	}
}
