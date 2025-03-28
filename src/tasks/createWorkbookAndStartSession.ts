import type { Workbook } from "@microsoft/microsoft-graph-types";
import type { DriveItemPath } from "../models/DriveItemPath.ts";
import type { DriveRef } from "../models/DriveRef.ts";
import type { WorkbookRef } from "../models/WorkbookRef.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import createWorkbookSession from "../operations/workbookSession/createWorkbookSession.ts";

export default async function createWorkbookAndStartSession(driveRef: DriveRef, itemPath: DriveItemPath): Promise<Workbook & WorkbookRef> {
	const workbook = await createWorkbook(driveRef, itemPath);
	const workbookRef = await createWorkbookSession(workbook);

	return {
		...workbook,
		...workbookRef,
	};
}
