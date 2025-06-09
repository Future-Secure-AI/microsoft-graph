/**
 * Safely delete a workbook by first closing any open sessions and then deleting it.
 * @module safeDeleteWorkbook
 * @category Tasks
 */

import type { WorkbookRef } from "../models/WorkbookRef.ts";
import closeWorkbookSession from "../operations/workbookSession/closeWorkbookSession.ts";
import deleteDriveItemWithRetry from "./deleteDriveItemWithRetry.ts";

/**
 * Safely delete a workbook by first closing any open sessions and then deleting it.
 *
 * @param workbookRef - A reference to the workbook to be deleted.
 * @returns Void when the workbook is successfully deleted.
 * @remarks Back-off retry to allow for any lingering locks to be closed.
 * @see https://github.com/Future-Secure-AI/microsoft-graph/blob/main/docs/lockedWorkbook.md
 */
export default async function safeDeleteWorkbook(workbookRef: WorkbookRef): Promise<void> {
	if (workbookRef.sessionId) {
		await closeWorkbookSession(workbookRef);
	}
	await deleteDriveItemWithRetry(workbookRef);
}
