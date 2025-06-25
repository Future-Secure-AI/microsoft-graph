/**
 * Pointer for a table in a worksheet.
 * @module WorkbookTable
 * @category Models
 */

import type { ColumnName } from "./Column.ts";
import type { WorkbookWorksheetRef } from "./WorkbookWorksheet.ts";

/**
 * Identifier for a table in a worksheet.
 */
export type WorkbookTableId = string & {
	__brand: "WorkbookTableId";
};

/**
 * Reference to a table in a worksheet.
 */
export type WorkbookTableRef = WorkbookWorksheetRef & {
	tableId: WorkbookTableId;
};

/**
 * Reference to a column in a table in a worksheet.
 */
export type WorkbookTableColumnRef = WorkbookTableRef & {
	column: ColumnName;
};
