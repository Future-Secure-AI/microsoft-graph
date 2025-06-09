/**
 * Text content of a cell in a worksheet.
 * @remarks This is a string that represents the text displayed in the cell, which may differ from the actual value of the cell (e.g., due to formatting).
 * @module CellText
 * @category Models
 */
export type CellText = string & {
	__brand: "CellText";
};
