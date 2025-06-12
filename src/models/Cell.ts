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
	 * Style applied to the cell to affect its appearance, like color, borders, alignment, etc.
	 */
	style: CellStyle;
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
	__brand: "CellFormat";
};

/**
 * Style applied to the cell to affect its appearance, like color, borders, alignment, etc.
 */
export type CellStyle = {
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
		top?: Border | undefined;
		bottom?: Border | undefined;
		left?: Border | undefined;
		right?: Border | undefined;
		insideVertical?: Border | undefined;
		insideHorizontal?: Border | undefined;
		diagonalDown?: Border | undefined;
		diagonalUp?: Border | undefined;
	};

	// TODO: Not yet supported, but possible
	// protection: {
	// 	/** Hide the formula. */
	// 	formulaHidden?: boolean | undefined;

	// 	/** Prevent cell changes */
	// 	locked?: boolean | undefined;
	// };
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
 * The amount of detail that we're reading from a cell.
 */
export type CellScope = {
	/** Raw underlying value. Cheap to read/write (1 op per ~10K cells for values, text & format) */
	values: boolean;

	/** Formatted value, as presented to the user. Cheap to read/write (1 op per ~10K cells for values, text & format) */
	text: boolean;

	/** Logic used to format values to text. Cheap to read/write (1 op per ~10K cells for values, text & format) */
	format: boolean;

	/** Content position with the cell. Expensive to read/write (1 op per cell) */
	alignment: boolean;

	/** Cell borders. Expensive to read/write (1 op per cell) */
	borders: boolean;

	/** Background fill style. Expensive to read/write (1 op per cell) */
	fill: boolean;

	/** Text style. Expensive to read/write (1 op per cell) */
	font: boolean;
};

export type CellHorizontalAlignment = "General" | "Left" | "Center" | "Right" | "Fill" | "Justify" | "CenterAcrossSelection" | "Distributed";

export type CellVerticalAlignment = "Top" | "Center" | "Bottom" | "Justify" | "Distributed";

export type CellUnderline = "None" | "Single" | "Double" | "SingleAccountant" | "DoubleAccountant";
