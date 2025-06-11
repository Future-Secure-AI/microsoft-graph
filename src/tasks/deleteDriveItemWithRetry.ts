/**
 * Delete a drive item, avoiding locking issues through automatic retries.
 * @module deleteDriveItemWithRetry
 * @category Tasks
 * @hidden
 */

import type { DriveItemRef } from "../models/DriveItem.ts";
import deleteDriveItem from "../operations/driveItem/deleteDriveItem.ts";
import { sleep } from "../services/sleep.ts";

/**
 * Delete a drive item, avoiding locking issues through automatic retries.
 *
 * @param driveItemRef Reference to the DriveItem to delete.
 * @remarks This function attempts to delete the drive item up to three times with increasing delays (1s, 2s, 4s) in case of failure.
 * @deprecated Use `deleteDriveItem` directly as this is now handled by the lowest level API
 */
export default async function deleteDriveItemWithRetry(driveItemRef: DriveItemRef): Promise<void> {
	const retryDelays = [1000, 2000, 4000];

	for (const delay of retryDelays) {
		try {
			await deleteDriveItem(driveItemRef);
			return;
		} catch (_) {
			await sleep(delay);
		}
	}

	await deleteDriveItem(driveItemRef);
}
