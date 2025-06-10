/**
 * Utilities for creating and working with workbook table references.
 * @module workbookTable
 * @category Services
 */

import type { WorkbookTableId, WorkbookTableRef } from "../models/WorkbookTable.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheet.ts";

/**
 * Creates a reference to a workbook table.
 * @param worksheetRef - The reference to the worksheet containing the table.
 * @param tableId - The ID of the table.
 * @returns A reference to the workbook table.
 * @throws Error if the table ID is missing.
 */
export function createWorkbookTableRef(worksheetRef: WorkbookWorksheetRef, tableId: WorkbookTableId | undefined): WorkbookTableRef {
	if (!tableId) {
		throw new Error("TableId is missing");
	}

	return {
		context: worksheetRef.context,
		siteId: worksheetRef.siteId,
		driveId: worksheetRef.driveId,
		itemId: worksheetRef.itemId,
		worksheetId: worksheetRef.worksheetId,
		sessionId: worksheetRef.sessionId,
		tableId: tableId,
	};
}
