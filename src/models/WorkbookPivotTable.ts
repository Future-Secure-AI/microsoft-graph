// biome-ignore lint/style/useFilenamingConvention: Appropriate in this context

/**
 * Pointer for a pivot table in a worksheet.
 * @module WorkbookPivotTable
 * @category Models
 */

import type { WorkbookWorksheetRef } from "./WorkbookWorksheet.ts";

/**
 * Identifier for a pivot table in a worksheet.
 */
export type WorkbookPivotTableId = string & {
	__brand: "WorkbookPivotTableId";
};

/**
 * Reference to a pivot table in a worksheet.
 */
export type WorkbookPivotTableRef = WorkbookWorksheetRef & {
	pivotTableId: WorkbookPivotTableId;
};
