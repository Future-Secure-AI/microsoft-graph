import type { WorkbookRef } from "../models/WorkbookRef.js";
import closeWorkbookSession from "../operations/workbookSession/closeWorkbookSession.js";
import { deleteDriveItemWithRetry } from "./deleteDriveItemWithRetry.js";

export default async function endSessionAndDeleteWorkbook(workbookRef: WorkbookRef): Promise<void> {
    await closeWorkbookSession(workbookRef);
    await deleteDriveItemWithRetry(workbookRef); // Close session takes a moment to release the file lock
}
