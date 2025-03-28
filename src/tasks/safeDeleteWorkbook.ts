import type { WorkbookRef } from "../models/WorkbookRef.ts";
import closeWorkbookSession from "../operations/workbookSession/closeWorkbookSession.ts";
import deleteDriveItemWithRetry from "./deleteDriveItemWithRetry.ts";

/** Safely delete a workbook by first closing any open sessions and then delete with a back-off retry to allow for any outstanding locks to be closed. */
export default async function safeDeleteWorkbook(workbookRef: WorkbookRef): Promise<void> {
    if (workbookRef.sessionId) {
        await closeWorkbookSession(workbookRef);
    }
    await deleteDriveItemWithRetry(workbookRef);
}
