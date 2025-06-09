/**
 * A cell in a workbook.
 * @remarks Contrary to common expectation, while a cell does contain a single value, it also contains a text representation of that value and a number format that often defines that representation.
 * @module Cell
 * @category Models
 */

import type { CellValue } from "../models/CellValue.ts";
import type { CellText } from "./CellText.ts";
import type { NumberFormat } from "./NumberFormat.ts";

export type Cell = {
	/**
	 * The text representation of the cell's value.
	 * @remarks This is often the same as the value, but can differ in cases where the value is a number and the text representation is formatted (e.g., "1,000" vs. 1000), or in the case of the value being a formula.
	 */
	text: CellText;

	/**
	 * The actual value of the cell.
	 */
	value: CellValue;

	/**
	 * Formatting that is applied to the value to derive the text representation.
	 */
	numberFormat: NumberFormat;
};
