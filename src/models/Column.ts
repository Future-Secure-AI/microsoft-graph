/**
 * Column pointers.
 * @module Column
 * @category Models
 */

import type { Cell } from "./Cell.ts";

/**
 * Vertical linear sequence of cells in a worksheet.
 */
export type Column = Cell[];

/**
 * Zero-based index representing the position of a column in a range.
 */
export type ColumnOffset = number & {
	__brand: "ColumnOffset";
};

/**
 * Name of a column, as configured by the user.
 */
export type ColumnName = string & {
	__brand: "ColumnName";
};
