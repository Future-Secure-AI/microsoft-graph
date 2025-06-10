/**
 * Cell in a worksheet.
 * @module Cell
 * @category Models
 */

/**
 * Cell in a worksheet.
 * @remarks Contrary to common expectation, while a cell does contain a single value, it also contains a text representation of that value and a number format that often defines that representation.
 */
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
	format: CellFormat;
};

/**
 * Text content of a cell in a worksheet.
 * @remarks This is a string that represents the text displayed in the cell, which may differ from the actual value of the cell (e.g., due to formatting).
 */
export type CellText = string & {
	__brand: "CellText";
};

/**
 * CellValue represents the value of a cell in a spreadsheet.
 * @see {@link Cell} for a more comprehensive representation of a cell, which includes text and formatting.
 */
export type CellValue = string | number | boolean;

/**
 * Format to be applied to a cell value to convert it to text to display to the user.
 * @see {@link Cell} for a more comprehensive representation of a cell, which includes text and formatting.
 */
export type CellFormat = string & {
	__brand: "CellFormat";
};
