/**
 * Copy a drive item.
 * @module copyDriveItem
 * @category Tasks
 */

import type { DriveItem } from "@microsoft/microsoft-graph-types";
import RequestTimeoutError from "../errors/RequestTimeoutError.ts";
import type { DriveItemPath } from "../models/DriveItemPath.ts";
import type { DriveItemRef } from "../models/DriveItemRef.ts";
import type { DriveRef } from "../models/DriveRef.ts";
import getDriveItemByPath from "../operations/driveItem/getDriveItemByPath.ts";
import initiateCopyDriveItem from "../operations/driveItem/initiateCopyDriveItem.ts";
import { splitDriveItemPath } from "../services/driveItem.ts";
import { sleep } from "../services/sleep.ts";

/**
 * Copy a drive item.
 * 
 * @remarks The underlying GraphAPI operation is asynchronous, so this function will block until the copy operation is complete or the timeout is reached.
 * @param srcFileRef A reference to the source file to be copied.
 * @param dstDriveRef Destination drive
 * @param dstFilePath Destination path where the item should be copied to.
 * @param timeoutMs Timeout in milliseconds for the copy operation.
 * @returns Reference to the new drive item.
 * @throws {@link RequestTimeoutError} If the copy operation does not complete within the specified timeout.
 */
export default async function copyDriveItem(srcFileRef: DriveItemRef, dstDriveRef: DriveRef, dstFilePath: DriveItemPath, timeoutMs = 16000): Promise<DriveItem & DriveItemRef> {
	const { folderPath, fileName } = splitDriveItemPath(dstFilePath);
	const dstFolder = folderPath === "/" ? dstDriveRef : await getDriveItemByPath(dstDriveRef, folderPath);

	await initiateCopyDriveItem(srcFileRef, dstFolder, fileName);

	const start = Date.now();
	let delay = 1000;

	while (true) {
		try {
			return await getDriveItemByPath(dstDriveRef, dstFilePath);
		} catch (_) {
			const elapsedTime = Date.now() - start;
			if (elapsedTime + delay > timeoutMs) {
				throw new RequestTimeoutError(`Timeout while copying ${srcFileRef.itemId} to ${dstFilePath}`);
			}
			await sleep(delay);
			delay = Math.min(delay * 2, timeoutMs - (Date.now() - start)); // Double the delay but don't exceed remaining time
		}
	}
}
