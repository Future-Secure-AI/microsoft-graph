import type { DriveItemRef } from "../models/DriveItemRef.ts";
import deleteDriveItem from "../operations/driveItem/deleteDriveItem.ts";
import { sleep } from "../services/sleep.ts";

/**
 * Delete a DriveItem, avoiding locking issues through automatic retries.
 *
 * @param driveItemRef - A reference to the DriveItem to delete.
 * @returns Void when the DriveItem is successfully deleted.
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
