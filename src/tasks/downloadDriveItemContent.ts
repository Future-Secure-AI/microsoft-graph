/**
 * Download a drive item and save it to the local disk.
 * @module downloadDriveItemContent
 * @category Tasks
 */

import { writeFile } from "node:fs/promises";
import type { DriveItemRef } from "../models/DriveItemRef.ts";
import getDriveItemContent from "../operations/driveItem/getDriveItemContent.ts";

/**
 * Download a drive item and save it to the local disk.
 *
 * @param itemRef A reference to the DriveItem to download.
 * @param localFilePath The local file path where the content should be saved.
 *  */
export default async function downloadDriveItemContent(itemRef: DriveItemRef, localFilePath: string): Promise<void> {
	const arrayBuffer: ArrayBuffer = await getDriveItemContent(itemRef);
	const buffer = Buffer.from(arrayBuffer);

	await writeFile(localFilePath, buffer);
}
