/**
 * Utilities for manipulating and analyzing spreadsheet-style addresses (A1 notation).
 * @module addressManipulation
 * @category Services
 */

import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import UnsupportedAddressTypeError from "../errors/UnsupportedAddressTypeError.ts";
import type { Address, CellAddress, CellRangeAddress, ColumnAddress, ColumnRangeAddress, DecomposedAddress, RowAddress, RowRangeAddress } from "../models/Address.ts";
import type { ColumnOffset } from "../models/Column.ts";
import type { RowOffset } from "../models/Row.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import { columnAddressToOffset, columnOffsetToAddress, rowAddressToOffset, rowOffsetToAddress } from "./addressOffset.ts";
import { addressToCartesian, cartesianToAddress } from "./cartesianAddress.ts";

const firstColumn: ColumnAddress = "A";
const lastColumn: ColumnAddress = "XFD";
const firstRow: RowAddress = "1";
const lastRow: RowAddress = "1048576";

const firstColumnOffset = columnAddressToOffset(firstColumn);
const lastColumnOffset = columnAddressToOffset(lastColumn);
const firstRowOffset = rowAddressToOffset(firstRow);
const lastRowOffset = rowAddressToOffset(lastRow);

const addressPattern = /^(?<sheet>(?:'[^']+'|[A-Za-z0-9_]+)!)?(?:(?<startColumn>[A-Z]+)?(?<startRow>\d+)?(?::(?<endColumn>[A-Z]+)?(?<endRow>\d+)?)?)$/;

type AddressParsedComponents = {
	startColumn: ColumnAddress | undefined;
	endColumn: ColumnAddress | undefined;
	startRow: RowAddress | undefined;
	endRow: RowAddress | undefined;
};

/**
 * Fixes address, removing an optional sheet prefix and ensuring it is a valid range.
 * @param address - The address to normalize.
 * @param forceRange - If true, forces the address to be a range even if it represents a single cell or row/column. This is useful to workaround API quirks.
 * @returns
 */
export function normalizeAddress(address: Address, forceRange = false): Address {
	return composeAddress(decomposeAddress(address), forceRange);
}

/**
 * Decomposes an address into its components (start and end columns/rows).
 * @param address - The address to decompose.
 * @returns The decomposed address components.
 * @throws InvalidArgumentError if the address format is invalid.
 */
export function decomposeAddress(address: Address): DecomposedAddress {
	const match = address.match(addressPattern);
	if (!match?.groups) {
		throw new InvalidArgumentError(`Invalid address '${address}'. Must match pattern '${addressPattern}'`);
	}

	const groups = match.groups as AddressParsedComponents;

	return {
		startColumn: groups.startColumn ?? firstColumn,
		startRow: groups.startRow ?? firstRow,
		endColumn: groups.endColumn ?? groups.startColumn ?? lastColumn,
		endRow: groups.endRow ?? groups.startRow ?? lastRow,
	};
}

/**
 * Composes an address from its components.
 * @param components - The address components.
 * @param forceRange - If true, forces the address to be a range even if it represents a single cell or row/column. Used to workaround API quirks
 * @returns The composed address.
 * @throws InvalidArgumentError if the components are invalid.
 */
export function composeAddress(components: DecomposedAddress, forceRange = false): Address {
	if (!forceRange && isSingleColumn(components) && isAllRows(components)) {
		return composeColumnAddress(components.startColumn);
	}

	if (!forceRange && isSingleRow(components) && isAllColumns(components)) {
		return composeRowAddress(components.startRow);
	}

	if (isAllRows(components)) {
		return composeColumnRangeAddress(components.startColumn, components.endColumn);
	}

	if (isAllColumns(components)) {
		return composeRowRangeAddress(components.startRow, components.endRow);
	}

	if (!forceRange && isSingleColumn(components) && isSingleRow(components)) {
		return composeCellAddress(components.startColumn, components.startRow);
	}

	return composeCellRangeAddress(components.startColumn, components.startRow, components.endColumn, components.endRow);
}

/**
 * Gets the first cell address from a given address.
 * @param address - The address to analyze.
 * @returns The first cell address.
 */
export function getFirstCellAddress(address: Address): CellAddress {
	const components = decomposeAddress(address);
	return composeCellAddress(components.startColumn, components.startRow);
}

/**
 * Gets the last cell address from a given address.
 * @param address - The address to analyze.
 * @returns The last cell address.
 */
export function getLastCellAddress(address: Address): CellAddress {
	const components = decomposeAddress(address);
	return composeCellAddress(components.endColumn, components.endRow);
}

/**
 * Gets the first row address from a given address.
 * @param address - The address to analyze.
 * @returns The first row address.
 */
export function getFirstRowAddress(address: Address): Address {
	const components = decomposeAddress(address);

	return composeAddress({
		startColumn: components.startColumn,
		startRow: components.startRow,
		endColumn: components.endColumn,
		endRow: components.startRow,
	});
}

/**
 * Gets the last row address from a given address.
 * @param address - The address to analyze.
 * @returns The last row address.
 */
export function getLastRowAddress(address: Address): Address {
	const components = decomposeAddress(address);

	return composeAddress({
		startColumn: components.startColumn,
		startRow: components.endRow,
		endColumn: components.endColumn,
		endRow: components.endRow,
	});
}

/**
 * Gets the first column address from a given address.
 * @param address - The address to analyze.
 * @returns The first column address.
 */
export function getFirstColumnAddress(address: Address): Address {
	const components = decomposeAddress(address);

	return composeAddress({
		startColumn: components.startColumn,
		startRow: components.startRow,
		endColumn: components.startColumn,
		endRow: components.endRow,
	});
}

/**
 * Gets the last column address from a given address.
 * @param address - The address to analyze.
 * @returns The last column address.
 */
export function getLastColumnAddress(address: Address): Address {
	const components = decomposeAddress(address);

	return composeAddress({
		startColumn: components.endColumn,
		startRow: components.startRow,
		endColumn: components.endColumn,
		endRow: components.endRow,
	});
}

/**
 * Offsets an address by the specified column and row offsets.
 * @param address - The address to offset.
 * @param columnOffset - The column offset.
 * @param rowOffset - The row offset.
 * @returns The offset address.
 * @throws UnsupportedAddressTypeError if the address cannot be offset.
 * @throws InvalidArgumentError if the offset is out of bounds.
 */
export function offsetAddress(address: Address, columnOffset: number, rowOffset: number): Address {
	const components = decomposeAddress(address);

	if (isAllRows(components) && rowOffset !== 0) {
		throw new UnsupportedAddressTypeError("All rows are selected. Cannot offset rows.");
	}

	if (isAllColumns(components) && columnOffset !== 0) {
		throw new UnsupportedAddressTypeError("All columns are selected. Cannot offset columns.");
	}

	const newStartRowIndex = rowAddressToOffset(components.startRow) + rowOffset;
	const newEndRowIndex = rowAddressToOffset(components.endRow) + rowOffset;

	if (newStartRowIndex < rowAddressToOffset(firstRow) || newEndRowIndex > rowAddressToOffset(lastRow)) {
		throw new InvalidArgumentError(`Row offset out of bounds: ${newStartRowIndex + 1} to ${newEndRowIndex + 1}`);
	}

	const newStartRow = rowOffsetToAddress(newStartRowIndex as RowOffset);
	const newEndRow = rowOffsetToAddress(newEndRowIndex as RowOffset);

	const newStartColumnIndex = columnAddressToOffset(components.startColumn) + columnOffset;
	const newEndColumnIndex = columnAddressToOffset(components.endColumn) + columnOffset;

	if (newStartColumnIndex < columnAddressToOffset(firstColumn) || newEndColumnIndex > columnAddressToOffset(lastColumn)) {
		throw new InvalidArgumentError(`Column offset out of bounds: ${newStartColumnIndex + 1} to ${newEndColumnIndex + 1}`);
	}

	const newStartColumn = columnOffsetToAddress(newStartColumnIndex as ColumnOffset);
	const newEndColumn = columnOffsetToAddress(newEndColumnIndex as ColumnOffset);

	return composeAddress({
		startColumn: newStartColumn as ColumnAddress,
		endColumn: newEndColumn as ColumnAddress,
		startRow: newStartRow as RowAddress,
		endRow: newEndRow as RowAddress,
	});
}

/**
 * Increments the row address by one.
 * @param address - The address to increment.
 * @returns The incremented address.
 */
export function incrementRowAddress(address: Address): Address {
	return offsetAddress(address, 0, +1);
}

/**
 * Decrements the row address by one.
 * @param address - The address to decrement.
 * @returns The decremented address.
 */
export function decrementRowAddress(address: Address): Address {
	return offsetAddress(address, 0, -1);
}

/**
 * Checks if two addresses overlap.
 * @param address1 - The first address.
 * @param address2 - The second address.
 * @returns True if the addresses overlap, otherwise false.
 */
export function isAddressOverlapping(address1: Address, address2: Address): boolean {
	const components1 = decomposeAddress(address1);
	const components2 = decomposeAddress(address2);

	return components1.startColumn <= components2.endColumn && components1.endColumn >= components2.startColumn && rowAddressToOffset(components1.startRow) <= rowAddressToOffset(components2.endRow) && rowAddressToOffset(components1.endRow) >= rowAddressToOffset(components2.startRow);
}

/**
 * Checks if the address components represent a single row.
 * @param address - The address to check.
 * @returns True if the components represent a single riw, otherwise false.
 */
export function isSingleRowAddress(address: Address): boolean {
	const components = decomposeAddress(address);
	return isSingleRow(components);
}

/**
 * Checks if the address components represent a single column.
 * @param address - The address to check.
 * @returns True if the components represent single columns, otherwise false.
 */
export function isSingleColumnAddress(address: Address): boolean {
	const components = decomposeAddress(address);
	return isSingleColumn(components);
}

/**
 * Checks if the address components represent all columns.
 * @param address - The address to check.
 * @returns True if the components represent all columns, otherwise false.
 */
export function isAllColumnsAddress(address: Address): boolean {
	const components = decomposeAddress(address);
	return isAllColumns(components);
}

/**
 * Checks if the address components represent all rows.
 * @param address - The address to check.
 * @returns True if the components represent all rows, otherwise false.
 */
export function isAllRowsAddress(address: Address): boolean {
	const components = decomposeAddress(address);
	return isAllRows(components);
}

/**
 * Counts the number of rows in a given address.
 * @param address - The address to analyze.
 * @returns The number of rows in the address.
 */
export function countAddressRows(address: Address): number {
	const components = decomposeAddress(address);
	return rowAddressToOffset(components.endRow) - rowAddressToOffset(components.startRow) + 1;
}

/**
 * Counts the number of columns in a given address.
 * @param address - The address to analyze.
 * @returns The number of columns in the address.
 */
export function countAddressColumns(address: Address): number {
	const components = decomposeAddress(address);
	return columnAddressToOffset(components.endColumn) - columnAddressToOffset(components.startColumn) + 1;
}

/**
 * Creates a range from a single cell address, extending by the specified number of rows and columns.
 * If rows/cols is positive, the cell is the start of the range; if negative, the cell is the end of the range.
 *
 * @param cell - The cell address to use as the anchor.
 * @param rows - Number of rows for the range. Positive: cell is start; Negative: cell is end.
 * @param cols - Number of columns for the range. Positive: cell is start; Negative: cell is end.
 * @returns The created address range.
 *
 * @throws {InvalidArgumentError} If the resulting address is out of bounds.
 *
 * @example
 * // Creates a 2x2 range starting at B2
 * cellToRangeAddress("B2", 2, 2); // "B2:C3"
 * // Creates a 2x2 range ending at B2
 * cellToRangeAddress("B2", -2, -2); // "A1:B2"
 * // Creates a 2x2 range starting at C3, extending 2 rows down and 2 columns left
 * cellToRangeAddress("B2", 2, -2)).toBe("A2:B3")
 */
export function cellToRangeAddress(cell: CellAddress, rows: number, cols: number): Address {
	const { ax, ay } = addressToCartesian(cell);

	// Determine start and end coordinates
	let startCol: number;
	let endCol: number;
	let startRow: number;
	let endRow: number;

	if (rows > 0) {
		startRow = ay;
		endRow = ay + rows - 1;
	} else if (rows < -1) {
		startRow = ay + rows + 1;
		endRow = ay;
	} else {
		throw new InvalidArgumentError("rows must not be zero or -1");
	}

	if (cols > 0) {
		startCol = ax;
		endCol = ax + cols - 1;
	} else if (cols < -1) {
		startCol = ax + cols + 1;
		endCol = ax;
	} else {
		throw new InvalidArgumentError("cols must not be zero or -1");
	}

	if (Math.min(startCol, endCol) < firstColumnOffset || Math.max(startCol, endCol) > lastColumnOffset || Math.min(startRow, endRow) < firstRowOffset || Math.max(startRow, endRow) > lastRowOffset) {
		throw new InvalidArgumentError(`Resulting address is out of bounds: rows [${Math.min(startRow, endRow) + 1},${Math.max(startRow, endRow) + 1}], cols [${Math.min(startCol, endCol) + 1},${Math.max(startCol, endCol) + 1}]`);
	}

	return cartesianToAddress({
		ax: Math.min(startCol, endCol) as ColumnOffset,
		bx: Math.max(startCol, endCol) as ColumnOffset,
		ay: Math.min(startRow, endRow) as RowOffset,
		by: Math.max(startRow, endRow) as RowOffset,
	});
}

/**
 * Extracts a sub-address from a spreadsheet-style A1 range (e.g., "A1:D10"),
 * allowing skip and take semantics on both rows and columns.
 *
 * Supports negative values for `skipRows` and `skipCols` to count from the end.
 * Supports negative values for `takeRows` and `takeCols` to exclude from the end after skipping.
 *
 * @param address Original range in A1 notation (e.g., "A1:D10").
 * @param skipRows Number of rows to skip. If negative, skips from the end. Default is 0.
 * @param takeRows Number of rows to take after skipping. If negative, excludes from the end of the remaining rows. Default is Infinity.
 * @param skipCols Number of columns to skip. If negative, skips from the end. Default is 0.
 * @param takeCols Number of columns to take after skipping. If negative, excludes from the end of the remaining columns. Default is Infinity.
 * @returns New A1-style range representing the sliced sub-range (e.g., "B2:C5").
 *
 * @example
 * subaddress("A1:D10", -1, 1); // Last row: "A10:D10"
 * subaddress("A1:D10", -2, 1); // Second last row: "A9:D9"
 * subaddress("A1:D10", 0, -1); // All but last row: "A1:D9"
 * subaddress("A1:D10", 0, Infinity, -2, 1); // Second last column: "C1:C10"
 */
export function subAddress(address: Address, skipRows = 0, takeRows: number | null = null, skipCols = 0, takeCols: number | null = null): Address {
	if (takeRows === undefined || takeRows === null) {
		takeRows = Number.POSITIVE_INFINITY;
	}
	if (takeCols === undefined || takeCols === null) {
		takeCols = Number.POSITIVE_INFINITY;
	}

	const { ax, bx, ay, by } = addressToCartesian(address);

	const [startRow, endRow] = slice(ay, by, skipRows, takeRows);
	const [startCol, endCol] = slice(ax, bx, skipCols, takeCols);

	if (startRow < ay || startRow > endRow || startCol < ax || startCol > endCol) {
		throw new InvalidArgumentError(`Requested subaddress is out of bounds of the base address ${address}.`);
	}

	return cartesianToAddress({
		ay: startRow as RowOffset,
		by: endRow as RowOffset,
		ax: startCol as ColumnOffset,
		bx: endCol as ColumnOffset,
	});

	function slice(start: number, end: number, skip: number, take: number): [number, number] {
		let s = start;
		let e = end;

		if (skip > 0) {
			s = start + skip;
		} else if (skip < 0) {
			s = end + skip + 1;
		}

		if (!Number.isFinite(take)) {
			// do nothing
		} else if (take >= 0) {
			e = s + take - 1;
		} else if (take < 0) {
			e += take;
		}

		// Clip e to not exceed the original end
		if (e > end) e = end;

		return [s, e];
	}
}

/**
 * Returns a super-address that extends the given address by skipping/taking rows/columns, possibly outside the original bounds.
 * Negative skip moves the start above/left of the original range (not from the end).
 *
 * @param address Original range in A1 notation (e.g., "A1:D10").
 * @param skipRows Number of rows to skip (can be negative to extend above).
 * @param takeRows Number of rows to take after skipping. If negative, excludes from the end. Default is Infinity.
 * @param skipCols Number of columns to skip (can be negative to extend left).
 * @param takeCols Number of columns to take after skipping. If negative, excludes from the end. Default is Infinity.
 * @returns New A1-style range representing the super range (may extend outside original bounds).
 *
 * @example
 * superAddress("B2:C3", -1, 4, -1, 4) // "A1:D5"
 */
export function superAddress(address: Address, skipRows = 0, takeRows: number | null = null, skipCols = 0, takeCols: number | null = null): Address {
	if (takeRows === undefined || takeRows === null) {
		takeRows = Number.POSITIVE_INFINITY;
	}
	if (takeCols === undefined || takeCols === null) {
		takeCols = Number.POSITIVE_INFINITY;
	}

	const { ax, bx, ay, by } = addressToCartesian(address);

	if (takeRows === Number.POSITIVE_INFINITY && skipRows > by - ay) {
		throw new InvalidArgumentError(`skipRows (${skipRows}) exceeds the number of rows in the address (${by - ay + 1}). Skip less or set a take.`);
	}

	if (takeCols === Number.POSITIVE_INFINITY && skipCols > bx - ax) {
		throw new InvalidArgumentError(`skipCols (${skipCols}) exceeds the number of columns in the address (${bx - ax + 1}). Skip less or set a take.`);
	}

	const [startRow, endRow] = superSlice(ay, by, skipRows, takeRows);
	const [startCol, endCol] = superSlice(ax, bx, skipCols, takeCols);

	return cartesianToAddress({
		ay: startRow as RowOffset,
		by: endRow as RowOffset,
		ax: startCol as ColumnOffset,
		bx: endCol as ColumnOffset,
	});

	function superSlice(start: number, end: number, skip: number, take: number): [number, number] {
		const s = start + skip;
		let e = end;

		if (!Number.isFinite(take)) {
			// do nothing
		} else if (take >= 0) {
			e = s + take - 1;
		} else if (take < 0) {
			e += take;
		}

		return [s, e];
	}
}

/**
 * Extracts a sub-range from a WorkbookRangeRef using skip/take semantics.
 * @param rangeRef Range reference to extract the sub-range from.
 * @param skipRows Number of rows to skip. If negative, skips from the end. Default 0.
 * @param takeRows Number of rows to take after skipping. If negative, excludes from the end. Default Infinity.
 * @param skipCols Number of columns to skip. If negative, skips from the end. Default 0.
 * @param takeCols Number of columns to take after skipping. If negative, excludes from the end. Default Infinity.
 * @returns Extracted sub-range reference.
 * @throws InvalidArgumentError if the requested rows or columns exceed the available range.
 */
export function subRange(rangeRef: WorkbookRangeRef, skipRows = 0, takeRows: number | null = null, skipCols = 0, takeCols: number | null = null): WorkbookRangeRef {
	const address = subAddress(rangeRef.address, skipRows, takeRows, skipCols, takeCols);
	return {
		...rangeRef,
		address,
	};
}

/**
 * Returns a super-range from a WorkbookRangeRef using skip/take semantics, possibly extending outside the original bounds.
 * Negative skip moves the start above/left of the original range (not from the end).
 *
 * @param rangeRef Range reference to extend.
 * @param skipRows Number of rows to skip (can be negative to extend above). Default 0.
 * @param takeRows Number of rows to take after skipping. If negative, excludes from the end. Default Infinity.
 * @param skipCols Number of columns to skip (can be negative to extend left). Default 0.
 * @param takeCols Number of columns to take after skipping. If negative, excludes from the end. Default Infinity.
 * @returns Extended super-range reference.
 */
export function superRange(rangeRef: WorkbookRangeRef, skipRows = 0, takeRows: number | null = null, skipCols = 0, takeCols: number | null = null): WorkbookRangeRef {
	const address = superAddress(rangeRef.address, skipRows, takeRows, skipCols, takeCols);
	return {
		...rangeRef,
		address,
	};
}

function isSingleRow(components: DecomposedAddress): boolean {
	return components.startRow === components.endRow;
}

function isSingleColumn(components: DecomposedAddress): boolean {
	return components.startColumn === components.endColumn;
}

function isAllColumns(components: DecomposedAddress): boolean {
	return components.startColumn === firstColumn && components.endColumn === lastColumn;
}

function isAllRows(components: DecomposedAddress): boolean {
	return components.startRow === firstRow && components.endRow === lastRow;
}

function composeCellRangeAddress(startColumn: string, startRow: string, endColumn: string, endRow: string): CellRangeAddress {
	return `${startColumn}${startRow}:${endColumn}${endRow}` as CellRangeAddress;
}

function composeCellAddress(startColumn: string, startRow: string): CellAddress {
	return `${startColumn}${startRow}` as CellAddress;
}

function composeRowRangeAddress(startRow: string, endRow: string): RowRangeAddress {
	return `${startRow}:${endRow}` as RowRangeAddress;
}

function composeColumnRangeAddress(startColumn: string, endColumn: string): ColumnRangeAddress {
	return `${startColumn}:${endColumn}` as ColumnRangeAddress;
}

function composeRowAddress(startRow: string): RowAddress {
	return startRow as RowAddress;
}

function composeColumnAddress(startColumn: string): ColumnAddress {
	return startColumn as ColumnAddress;
}
