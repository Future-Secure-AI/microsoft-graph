import type { DriveItemRef } from "../models/DriveItemRef.ts";
import deleteDriveItem from "../operations/driveItem/deleteDriveItem.ts";
import { sleep } from "../services/sleep.ts";

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

    // Final attempt without delay
    await deleteDriveItem(driveItemRef);
} 