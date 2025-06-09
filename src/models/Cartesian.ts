/**
 * Cartesian coordinates of a set of cells in a spreadsheet.
 * @module Cartesian
 * @category Models
 */

import type { ColumnOffset } from "../models/ColumnOffset.ts";
import type { RowOffset } from "../models/RowOffset.ts";

export type Cartesian = {
	/**
	 * The column offset of the top-left cell in the Cartesian coordinates.
	 */
	ax: ColumnOffset;

	/**
	 * The row offset of the top-left cell in the Cartesian coordinates.
	 */
	ay: RowOffset;

	/**
	 * The column offset of the bottom-right cell in the Cartesian coordinates.
	 */
	bx: ColumnOffset;

	/**
	 * The row offset of the bottom-right cell in the Cartesian coordinates.
	 */
	by: RowOffset;
};
