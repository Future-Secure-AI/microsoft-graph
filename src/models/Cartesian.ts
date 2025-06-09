import type { ColumnOffset } from "../models/ColumnOffset.ts";
import type { RowOffset } from "../models/RowOffset.ts";

/**
 * Cartesian coordinates of a set of cells in a spreadsheet.
 * @module Cartesian
 * @category Models
 */
export type Cartesian = {
	/**
	 * The column offset of the top-left cell in the Cartesian coordinates.
	 * @remarks This is a zero-based index.
	 */
	ax: ColumnOffset;

	/**
	 * The row offset of the top-left cell in the Cartesian coordinates.
	 * @remarks This is a zero-based index.
	 */
	ay: RowOffset;

	/**
	 * The column offset of the bottom-right cell in the Cartesian coordinates.
	 * @remarks This is a zero-based index.
	 */
	bx: ColumnOffset;

	/**
	 * The row offset of the bottom-right cell in the Cartesian coordinates.
	 * @remarks This is a zero-based index.
	 */
	by: RowOffset;
};
