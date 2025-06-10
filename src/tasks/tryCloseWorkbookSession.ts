/**
 * Try and close a workbook session.
 * @module tryCloseWorkbookSession
 * @category Tasks
 */
import type { WorkbookRef } from "../models/Workbook.ts";
import closeWorkbookSession from "../operations/workbookSession/closeWorkbookSession.ts";

/**
 * Try and close a workbook session.
 * @param workbookRef Reference to the workbook. The session ID is required.
 * @returns If the session was closed, false if it was not possible to close the session.
 * @remarks Does not error if the session is already closed or expired.
 **/
export default async function tryCloseWorkbookSession(workbookRef: WorkbookRef): Promise<boolean> {
	try {
		await closeWorkbookSession(workbookRef);
		return true;
	} catch (_) {
		return false;
	}
}
