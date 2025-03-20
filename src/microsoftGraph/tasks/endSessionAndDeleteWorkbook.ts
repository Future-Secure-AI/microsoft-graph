import type { WorkbookRef } from "../models/WorkbookRef.ts";
import closeWorkbookSession from "../operations/workbookSession/closeWorkbookSession.ts";
import deleteDriveItemWithRetry from "./deleteDriveItemWithRetry.ts";

export default async function endSessionAndDeleteWorkbook(workbookRef: WorkbookRef): Promise<void> {
    await closeWorkbookSession(workbookRef);
    await deleteDriveItemWithRetry(workbookRef); // Close session takes a moment to release the file lock
}
