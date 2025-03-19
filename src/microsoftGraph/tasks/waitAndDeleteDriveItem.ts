import { executeSingle } from "../graphApi.js";
import type { DriveItemRef } from "../models/DriveItemRef.js";
import deleteDriveItem from "../operations/driveItem/deleteDriveItem.js";
import { sleep } from "../services/sleep.js";

export async function deleteDriveItemWithRetry(driveItemRef: DriveItemRef): Promise<void> {
    try {
        await executeSingle(deleteDriveItem(driveItemRef));
    } catch (_) {
        try {
            await sleep(1000);
            await executeSingle(deleteDriveItem(driveItemRef));
        } catch (_) {
            await sleep(2000);
            await executeSingle(deleteDriveItem(driveItemRef));
        }
    }
}