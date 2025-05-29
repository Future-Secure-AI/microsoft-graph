import type { Workbook } from "@microsoft/microsoft-graph-types";
import type { DriveItemPath } from "../models/DriveItemPath.ts";
import type { DriveItemRef } from "../models/DriveItemRef.ts";
import type { DriveRef } from "../models/DriveRef.ts";
import type { WorkbookRef } from "../models/WorkbookRef.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import createWorkbookSession from "../operations/workbookSession/createWorkbookSession.ts";

/**
 * Create a new workbook and open a session for that workbook in a single operation.
 *
 * @param parentRef - A reference to the drive or driveItem where the workbook will be created.
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
