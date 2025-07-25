/**
 * Cell in a worksheet.
 * @module Cell
 * @category Models
 */

import type { Border } from "./Border.ts";
import type { Color } from "./Color.ts";
import type { FontName } from "./FontName.ts";

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

	/**
	 * Number of cell merges (WRITE ONLY).
	 * @remarks Due to API limitations, this value is never populated when reading a cell, but it can be set when writing a cell.
	 * @experimental
	 */
	merge: {
		right?: number;
		down?: number;
	};

	/**
	 * Alignment of cell contents.
	 * @experimental
	 */
	alignment: {
		horizontal?: CellHorizontalAlignment;
		vertical?: CellVerticalAlignment;
		wrapText?: boolean | undefined;
	};

	/**
	 * Borders around the cell.
	 * @experimental
	 */
	borders: {
		// TODO: On next breaking revision this should be "border" to be consistent with scope. Or maybe scope should change?
		edgeTop?: Border | undefined;
		edgeBottom?: Border | undefined;
		edgeLeft?: Border | undefined;
		edgeRight?: Border | undefined;
		insideVertical?: Border | undefined;
		insideHorizontal?: Border | undefined;
		diagonalDown?: Border | undefined;
		diagonalUp?: Border | undefined;
	};

	/**
	 * Fill color of the cell.
	 * @experimental
	 */
	fill: {
		color?: Color;
	};
	/**
	 * Font settings for the cell.
	 * @experimental
	 */
	font: {
		name?: FontName;
		size?: number;
		color?: Color;
		bold?: boolean;
		italic?: boolean;
		underline?: CellUnderline;
	};
};

/**
 * CellValue represents the value of a cell in a spreadsheet.
 * @see {@link Cell} for a more comprehensive representation of a cell, which includes text and formatting.
 */
export type CellValue = string | number | boolean;

/**
 * Text content of a cell in a worksheet.
 * @remarks This is a string that represents the text displayed in the cell, which may differ from the actual value of the cell (e.g., due to formatting).
 */
export type CellText = string;

/**
 * Format to be applied to a cell value to convert it to text to display to the user.
 * @see {@link Cell} for a more comprehensive representation of a cell, which includes text and formatting.
 */
export type CellFormat = string & {
	readonly __brand: unique symbol;
};

/**
 * The amount of detail that we're reading from a cell.
 */
export type CellScope = {
	/** Raw cell value. CHEAP (+1 op per 10K cells, no additional op with `text` or `format`) */
	value: boolean;

	/** Formatted value, as presented to the user. CHEAP (+1 op per 10K cells, no additional call op `values` or `format`) */
	text: boolean;

	/** Logic used to format values to text. CHEAP (+1 op per 10K cells, no additional call op `values` or `text`) */
	format: boolean;

	/** Content position with the cell. VERY EXPENSIVE (+1 op per cell) */
	alignment: boolean;

	/** Cell borders. VERY EXPENSIVE (+1 op per cell)  */
	border: boolean;

	/** Background fill style. VERY EXPENSIVE (+1 op per cell)  */
	fill: boolean;

	/** Text style. VERY EXPENSIVE (+1 op per cell) */
	font: boolean;
};

export type CellHorizontalAlignment = "General" | "Left" | "Center" | "Right" | "Fill" | "Justify" | "CenterAcrossSelection" | "Distributed";

export type CellVerticalAlignment = "Top" | "Center" | "Bottom" | "Justify" | "Distributed";

export type CellUnderline = "None" | "Single" | "Double" | "SingleAccountant" | "DoubleAccountant";
