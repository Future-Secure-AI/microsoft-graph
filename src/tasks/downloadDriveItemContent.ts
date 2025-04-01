import { writeFile } from "node:fs/promises";
import type { DriveItemRef } from "../models/DriveItemRef.ts";
import getDriveItemContent from "../operations/driveItem/getDriveItemContent.ts";

/**
 * Download a DriveItem and save it as a local file.
 *
 * @param itemRef - A reference to the DriveItem to download.
 * @param localFilePath - The local file path where the content should be saved.
 * @returns Void when the content is successfully downloaded and saved.
 */
export default async function downloadDriveItemContent(itemRef: DriveItemRef, localFilePath: string): Promise<void> {
	const arrayBuffer: ArrayBuffer = await getDriveItemContent(itemRef);
	const buffer = Buffer.from(arrayBuffer);

	await writeFile(localFilePath, buffer);
}
