import type { DriveItemPath } from "../models/DriveItemPath.ts";
import type { DriveRef } from "../models/DriveRef.ts";
import type { WorkbookRef } from "../models/WorkbookRef.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import { driveItemRef } from "../services/driveItem.ts";
import startWorkbookSession from "./startWorkbookSession.ts";

export default async function createWorkbookAndStartSession(driveRef: DriveRef, itemPath: DriveItemPath): Promise<WorkbookRef> {
    const item = await createWorkbook(driveRef, itemPath);
    const itemRef = driveItemRef(driveRef, item.id);
    return await startWorkbookSession(itemRef);
}
