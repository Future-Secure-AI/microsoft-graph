import execute from "../execute.js";
import type { WorkbookRef } from "../workbooks/WorkbookRef.js";
import createWorkbookSession from "../workbooks/workbookSession/createWorkbookSession.js";

/** Convenience helper to start a workbook session */
export default async function openWorkbook(workbookRef: WorkbookRef): Promise<WorkbookRef> {
    const [session] = await execute(createWorkbookSession(workbookRef));

    return {
        ...workbookRef,
        sessionId: session.id,
    }
}