/**
 * Safely delete a workbook by first closing any open sessions and then deleting it.
 * @module safeDeleteWorkbook
 * @category Tasks
 */

import type { WorkbookRef } from "../models/WorkbookRef.ts";
import deleteDriveItem from "../operations/driveItem/deleteDriveItem.ts";
import closeWorkbookSession from "../operations/workbookSession/closeWorkbookSession.ts";

/**
 * Safely delete a workbook by first closing any open sessions and then deleting it.
 *
 * @param workbookRef Reference to the workbook to be deleted.
 * @returns Void when the workbook is successfully deleted.
 * @see https://github.com/Future-Secure-AI/microsoft-graph/blob/main/docs/lockedWorkbook.md
 */
export default async function safeDeleteWorkbook(workbookRef: WorkbookRef): Promise<void> {
	if (workbookRef.sessionId) {
		await closeWorkbookSession(workbookRef);
	}
	await deleteDriveItem(workbookRef);
}
