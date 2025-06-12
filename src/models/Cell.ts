/**
 * Cell in a worksheet.
 * @module Cell
 * @category Models
 */

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
	merge?: {
		right?: number;
		down?: number;
	};
	/**
	 * Alignment of cell contents.
	 * @experimental
	 */
	alignment?: {
		horizontal?: "General" | "Left" | "Center" | "Right" | "Fill" | "Justify" | "CenterAcrossSelection" | "Distributed";
		vertical?: "Top" | "Center" | "Bottom" | "Justify" | "Distributed";
	};
	/**
	 * When text exceeds the cell width, it can either overflow into the next cell or wrap to the next line.
	 * @experimental
	 */
	wrapText?: boolean;

	/**
	 * Borders around the cell.
	 * @experimental
	 */
	borders?: {
		color?: Color;
		side?: "EdgeTop" | "EdgeBottom" | "EdgeLeft" | "EdgeRight" | "InsideVertical" | "InsideHorizontal" | "DiagonalDown" | "DiagonalUp";
		style?: "None" | "Continuous" | "Dash" | "DashDot" | "DashDotDot" | "Dot" | "Double" | "SlantDashDot";
		weight?: "Hairline" | "Thin" | "Medium" | "Thick";
	};

	/**
	 * Protection settings for the cell.
	 * @experimental
	 */
	protection?: {
		/** Hide the formula. */
		formulaHidden?: boolean;
		/** Prevent cell changes */
		locked?: boolean;
	};

	/**
	 * Fill color of the cell.
	 * @experimental
	 */
	fill?: {
		color?: Color;
	};

	/**
	 * Font settings for the cell.
	 * @experimental
	 */
	font?: {
		name?: FontName;
		size?: number;
		color?: Color;
		bold?: boolean;
		italic?: boolean;
		underline?: "None" | "Single" | "Double" | "SingleAccountant" | "DoubleAccountant";
	};
};

/**
 * Text content of a cell in a worksheet.
 * @remarks This is a string that represents the text displayed in the cell, which may differ from the actual value of the cell (e.g., due to formatting).
 */
export type CellText = string;

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

/**
 * The amount of detail that we're reading from a cell.
 * @remarks This is used to determine how much information we want to extract from a cell when reading it, since usually we just want values, sometimes we also want text, and rarely we want the format.
 */
export type CellScope = "Values" | "ValuesText" | "ValuesTextFormat";
