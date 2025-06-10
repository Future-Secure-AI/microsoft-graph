/**
 * A linear sequency of cells in a worksheet.
 * @module Row
 * @category Models
 */

import type { Cell } from "./Cell.ts";

export type Row = Cell[];

/**
 * Row number as it appears in Excel.
 * @remarks First row is 1.
 */
export type RowNumber = number & {
	__brand: "RowNumber";
};

/**
 * Zero-based index representing the position of a row in a range.
 */
export type RowOffset = number & {
	__brand: "RowOffset";
};
