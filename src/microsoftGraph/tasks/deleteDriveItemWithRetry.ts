import type { DriveItemRef } from "../models/DriveItemRef.ts";
import deleteDriveItem from "../operations/driveItem/deleteDriveItem.ts";
import { sleep } from "../services/sleep.ts";

export async function deleteDriveItemWithRetry(driveItemRef: DriveItemRef): Promise<void> {
    try {
        await deleteDriveItem(driveItemRef);
    } catch (_) {
        try {
            await sleep(1000);
            await deleteDriveItem(driveItemRef);
        } catch (_) {
            await sleep(2000);
            await deleteDriveItem(driveItemRef);
        }
    }
}