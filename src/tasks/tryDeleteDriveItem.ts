/**
 * Attempts to delete a drive item, returning success status.
 * @module tryDeleteDriveItem
 * @category Tasks
 */
import LockedError from "../errors/LockedError.ts";
import NotFoundError from "../errors/NotFoundError.ts";
import type { DriveItemRef } from "../models/DriveItem.ts";
import deleteDriveItem, { type DeleteDriveItemOptions } from "../operations/driveItem/deleteDriveItem.ts";

/**
 * Attempts to delete a drive item, returning success status.
 * @param driveItemRef A reference to the DriveItem to delete.
 * @param {DeleteDriveItemOptions} [options] Optional options for deletion.
 * @returns TRUE if successfully deleted, FALSE if the file is missing or locked.
 * @remarks No error is thrown.
 */
export default async function tryDeleteDriveItem(driveItemRef: DriveItemRef, options: DeleteDriveItemOptions = {}): Promise<boolean> {
	try {
		await deleteDriveItem(driveItemRef, options);
		return true;
	} catch (err) {
		if (err instanceof NotFoundError || err instanceof LockedError) {
			return false;
		}
		throw err;
	}
}
