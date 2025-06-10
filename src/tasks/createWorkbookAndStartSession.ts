/**
 * Create a new workbook and open a session for that workbook.
 * @module createWorkbookAndStartSession
 * @category Tasks
 */

import type { Workbook } from "@microsoft/microsoft-graph-types";
import type { DriveRef } from "../models/Drive.ts";
import type { DriveItemPath, DriveItemRef } from "../models/DriveItem.ts";
import type { WorkbookRef } from "../models/Workbook.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import createWorkbookSession from "../operations/workbookSession/createWorkbookSession.ts";

/**
 * Create a new workbook and open a session for that workbook/
 *
 * @param parentRef Reference to the drive or driveItem where the workbook will be created.
 * @param itemPath - The path of the new workbook within the drive.
 * @returns The created workbook and session details.
 */
export default async function createWorkbookAndStartSession(parentRef: DriveRef | DriveItemRef, itemPath: DriveItemPath): Promise<Workbook & WorkbookRef> {
	const workbook = await createWorkbook(parentRef, itemPath);
	const workbookRef = await createWorkbookSession(workbook);

	return {
		...workbook,
		...workbookRef,
	};
}
