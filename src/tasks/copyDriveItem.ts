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
 * Copy a drive item, blocking and polling for completion.
 *
 * @param srcFileRef - A reference to the source file to be copied.
 * @param dstFilePath - Destination file path
 * @param timeoutMs - Timeout in milliseconds for the copy operation.
 * @returns
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
