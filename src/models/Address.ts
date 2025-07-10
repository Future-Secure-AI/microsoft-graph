/**
 * Address of a set of cells in a spreadsheet.
 * @module Address
 * @category Models
 */

/**
 * Address of a single column in a worksheet.
 * @example 'C'
 */
export type ColumnAddress = `${Uppercase<string>}`;

/**
 * Address of multiple consecutive columns in a worksheet ().
 * @example 'C:D'
 */
export type ColumnRangeAddress = `${CellAddress}:${CellAddress}`;

/**
 * Address of a used range in a column, either from the start or to the end.
 * @example 'C:'
 * @example ':D'
 */
export type UsedColumnRangeAddress = `${ColumnAddress}:` | `:${ColumnAddress}`;

/**
 * Address of a single row in a worksheet.
 * @example '3'
 */
export type RowAddress = `${number}`;

/**
 * Address of multiple consecutive rows in a worksheet.
 * @example '3:5'
 */
export type RowRangeAddress = `${RowAddress}:${RowAddress}`;

/**
 * Address of a used range in a row, either from the start or to the end.
 * @example '3:'
 * @example ':5'
 */
export type UsedRowRangeAddress = `${RowAddress}:` | `:${RowAddress}`;

/**
 * Address of a single cell in a worksheet.
 * @example 'C3'
 */
export type CellAddress = `${ColumnAddress}${RowAddress}`;

/**
 * Address of a range of cells in a worksheet.
 * @example 'C3:D5'
 */
export type CellRangeAddress = `${CellAddress}:${CellAddress}`;

/**
 * Address of a used range in a cell, either from the start or to the end.
 * @example 'C3:'
 * @example ':D5'
 */
export type UsedCellRangeAddress = `${CellAddress}:` | `:${CellAddress}`;

/**
 * Address representing the entire used range in a worksheet.
 * @example ':'
 */
export type AllUsedAddress = ":";
/**
 * Any type of address.
 * @remarks This is a union of all the address types defined above.
 * @example 'C', 'C:D', '3', '3:5', 'C3', 'C3:D5'
 */
export type Address = ColumnAddress | ColumnRangeAddress | RowAddress | RowRangeAddress | CellAddress | CellRangeAddress;

/**
 * Any type of used range address, including entire, column, row, or cell used ranges.
 */
export type UsedAddress = AllUsedAddress | UsedColumnRangeAddress | UsedRowRangeAddress | UsedCellRangeAddress;

/**
 * Address when decomposed into its components.
 * @property startColumn - The starting column address.
 * @property endColumn - The ending column address.
 * @property startRow - The starting row address.
 * @property endRow - The ending row address.
 */
export type DecomposedAddress = {
	startColumn: ColumnAddress;
	endColumn: ColumnAddress;
	startRow: RowAddress;
	endRow: RowAddress;
};
