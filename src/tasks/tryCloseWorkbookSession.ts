import type { WorkbookRef } from "../models/WorkbookRef.ts";
import closeWorkbookSession from "../operations/workbookSession/closeWorkbookSession.ts";

/**
 * Try and close a workbook session. Do not error if not possible
 *
 * @param workbookRef - A reference to the workbook, optionally including session information. The session ID is required.
 * @returns true if the session was closed, false if it was not possible to close the session.
 **/
export default async function tryCloseWorkbookSession(workbookRef: WorkbookRef): Promise<boolean> {
	try {
		await closeWorkbookSession(workbookRef);
		return true;
	} catch (_) {
		return false;
	}
}
