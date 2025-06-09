/**
 * Utilities for working with cell text values in spreadsheets.
 * @module cellText
 * @category Services
 */

import type { CellText } from "../models/CellText.ts";

/**
 * Casts a string to CellText.
 */
export function asCellText(text: string): CellText {
	return text as CellText;
}
