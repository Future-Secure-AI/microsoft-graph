/**
 * A linear sequency of cells in a worksheet.
 * @module Row
 * @category Models
 */

import type { Cell } from "./Cell.ts";

/**
 * Horizontal linear sequence of cells in a worksheet.
 */
export type Row = Cell[];

/**
 * Row number as it appears in Excel.
 * @remarks First row is 1.
 */
export type RowNumber = number & {
	readonly __brand: unique symbol;
};

/**
 * Zero-based index representing the position of a row in a range.
 */
export type RowOffset = number & {
	readonly __brand: unique symbol;
};
