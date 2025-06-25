/**
 * Pointers to a named range in a worksheet.
 * @module WorkbookNamedRange
 * @category Models
 */

import type { WorkbookRef } from "./Workbook.ts";

/**
 * Name of a range in a workbook.
 */

export type WorkbookRangeName = string & {
	__brand: "WorkbookRangeName";
};

/**
 * Reference to a named range in a workbook.
 */
export type WorkbookNamedRangeRef = WorkbookRef & {
	rangeName: WorkbookRangeName;
};
