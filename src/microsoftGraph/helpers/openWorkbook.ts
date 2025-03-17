import execute from "../execute.js";
import createWorkbookSession from "../operations/workbookSession/createWorkbookSession.js";
import type { WorkbookRef } from "../workbooks/WorkbookRef.js";

/** Opinionated convenience helper to start a workbook session. Includes starting a session. */
export default async function openWorkbook(workbookRef: WorkbookRef): Promise<WorkbookRef> {
    const [session] = await execute(createWorkbookSession(workbookRef));

    return {
        ...workbookRef,
        sessionId: session.id,
    }
}