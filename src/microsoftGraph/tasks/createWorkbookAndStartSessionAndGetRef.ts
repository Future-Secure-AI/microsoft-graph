import { executeSingle } from "../graphApi.js";
import type { DriveItemPath } from "../models/DriveItemPath.js";
import type { DriveRef } from "../models/DriveRef.js";
import type { WorkbookRef } from "../models/WorkbookRef.js";
import createWorkbook from "../operations/workbook/createWorkbook.js";
import { driveItemRef } from "../services/driveItem.js";
import startWorkbookSessionAndGetRef from "./createWorkbookSessionAndGetRef.js";

export default async function createWorkbookAndStartSessionAndGetRef(driveRef: DriveRef, itemPath: DriveItemPath): Promise<WorkbookRef> {
    const item = await executeSingle(createWorkbook(driveRef, itemPath));
    const itemRef = driveItemRef(driveRef, item.id);

    return await startWorkbookSessionAndGetRef(itemRef);
}
