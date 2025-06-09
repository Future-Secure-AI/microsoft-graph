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
 * Any type of address.
 * @remarks This is a union of all the address types defined above.
 * @example 'C', 'C:D', '3', '3:5', 'C3', 'C3:D5'
 */
export type Address = ColumnAddress | RowAddress | ColumnRangeAddress | RowRangeAddress | CellRangeAddress | CellAddress;
