/**
 * Utilities for working with workbook pivot tables and their references.
 * @module workbookPivotTable
 * @category Services
 */

import type { WorkbookPivotTableId, WorkbookPivotTableRef } from "../models/WorkbookPivotTable.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheet.ts";

/**
 * Creates a reference to a workbook pivot table.
 * @param worksheetRef Reference to the worksheet containing the pivot table.
 * @param pivotTableId ID of the pivot table.
 * @returns Reference to the workbook pivot table.
 * @throws Error if the pivot table ID is missing.
 */
export function createWorkbookPivotTableRef(worksheetRef: WorkbookWorksheetRef, pivotTableId: WorkbookPivotTableId | undefined): WorkbookPivotTableRef {
	if (!pivotTableId) {
		throw new Error("TableId is missing");
	}

	return {
		context: worksheetRef.context,
		siteId: worksheetRef.siteId,
		driveId: worksheetRef.driveId,
		itemId: worksheetRef.itemId,
		worksheetId: worksheetRef.worksheetId,
		sessionId: worksheetRef.sessionId,
		pivotTableId: pivotTableId,
	};
}
