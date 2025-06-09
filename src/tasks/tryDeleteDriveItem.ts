/**
 * Attempts to delete a drive item, returning success status.
 * @module tryDeleteDriveItem
 * @category Tasks
 */
import type { DriveItemRef } from "../models/DriveItemRef.ts";
import deleteDriveItem from "../operations/driveItem/deleteDriveItem.ts";

/**
 * Attempts to delete a drive item, returning success status.
 * @param driveItemRef A reference to the DriveItem to delete.
 * @returns Boolean indicating whether the DriveItem was successfully deleted.
 * @remarks No error is thrown.
 */
export default async function tryDeleteDriveItem(driveItemRef: DriveItemRef): Promise<boolean> {
	try {
		await deleteDriveItem(driveItemRef);
		return true;
	} catch (_) {
		return false;
	}
}
