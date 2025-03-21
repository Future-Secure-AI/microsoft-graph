import { writeFile } from "node:fs/promises";
import type { DriveItemRef } from "../models/DriveItemRef.ts";
import getDriveItemContent from "../operations/driveItem/getDriveItemContent.ts";

export default async function downloadDriveItemContent(itemRef: DriveItemRef, localFilePath: string): Promise<void> {
    const arrayBuffer: ArrayBuffer = await getDriveItemContent(itemRef);
    const buffer = Buffer.from(arrayBuffer);

    await writeFile(localFilePath, buffer);
}