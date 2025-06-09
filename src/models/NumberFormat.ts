// TODO: Move to `Cell.ts` at next major version. Perhaps rename to `CellFormat`.

/**
 * Format to be applied to a cell value to convert it to text to display to the user.
 * @module NumberFormat
 * @category Models
 * @see {@link Cell} for a more comprehensive representation of a cell, which includes text and formatting.
 */
export type NumberFormat = string & {
	__brand: "NumberFormat";
};
