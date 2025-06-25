/**
 * Pointer for a worksheet in a workbook.
 * @module WorkbookWorksheet
 * @category Models
 */

import type { WorkbookRef } from "./Workbook.ts";

/**
 * Identifier for a worksheet in a workbook.
 */
export type WorkbookWorksheetId = string & {
	__brand: "WorkbookWorksheetId";
};

/**
 * Name of a worksheet in a workbook.
 */
export type WorkbookWorksheetName = string & {
	__brand: "WorkbookWorksheetName";
};

/**
 * Reference to a worksheet in a workbook.
 */
export type WorkbookWorksheetRef = WorkbookRef & {
	worksheetId: WorkbookWorksheetId;
};
