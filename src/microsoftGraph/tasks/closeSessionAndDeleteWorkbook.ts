import { execute } from "../graphApi.js";
import type { WorkbookRef } from "../models/WorkbookRef.js";
import deleteDriveItem from "../operations/driveItem/deleteDriveItem.js";
import closeWorkbookSession from "../operations/workbookSession/closeWorkbookSession.js";
import { sleep } from "../services/sleep.js";

export default async function closeSessionAndDeleteWorkbook(workbookRef: WorkbookRef): Promise<void> {
    await execute(closeWorkbookSession(workbookRef));
    await sleep(1000); // Close session takes a moment to release the file lock
    await execute(deleteDriveItem(workbookRef));
}
