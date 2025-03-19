import { executeSingle } from "../graphApi.js";
import type { WorkbookRef } from "../models/WorkbookRef.js";
import closeWorkbookSession from "../operations/workbookSession/closeWorkbookSession.js";
import { deleteDriveItemWithRetry } from "./waitAndDeleteDriveItem.js";

export default async function closeSessionAndDeleteWorkbook(workbookRef: WorkbookRef): Promise<void> {
    await executeSingle(closeWorkbookSession(workbookRef));
    await deleteDriveItemWithRetry(workbookRef);// Close session takes a moment to release the file lock
}
