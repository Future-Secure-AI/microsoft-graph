import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import UnsupportedAddressTypeError from "../errors/UnsupportedAddressTypeError.ts";
import type { Address, CellAddress, CellRangeAddress, ColumnAddress, ColumnRangeAddress, RowAddress, RowRangeAddress } from "../models/Address.ts";
import type { ColumnOffset } from "../models/ColumnOffset.ts";
import type { RowOffset } from "../models/RowOffset.ts";
import { columnAddressToOffset, offsetToColumnAddress, offsetToRowAddress, rowAddressToOffset } from "./addressOffset.ts";

const firstColumn: ColumnAddress = "A";
const lastColumn: ColumnAddress = "XFD";
const firstRow: RowAddress = "1";
const lastRow: RowAddress = "1048576";

const addressPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?:(?<startColumn>[A-Z]+)?(?<startRow>\d+)?(?::(?<endColumn>[A-Z]+)?(?<endRow>\d+)?)?)$/;

type AddressParsedComponents = {
	startColumn: ColumnAddress | undefined;
	endColumn: ColumnAddress | undefined;
	startRow: RowAddress | undefined;
	endRow: RowAddress | undefined;
};

export type AddressComponents = {
	startColumn: ColumnAddress;
	endColumn: ColumnAddress;
	startRow: RowAddress;
	endRow: RowAddress;
};

/**
 * Decomposes an address into its components (start and end columns/rows).
 * @param address - The address to decompose.
 * @returns The decomposed address components.
 * @throws InvalidArgumentError if the address format is invalid.
 */
export function decomposeAddress(address: Address): AddressComponents {
	const match = address.match(addressPattern);
	if (!match?.groups) {
		throw new InvalidArgumentError(`Invalid address format. Must match pattern '${addressPattern}'`);
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
 * @returns The composed address.
 * @throws InvalidArgumentError if the components are invalid.
 */
export function composeAddress(components: AddressComponents): Address {
	if (isSingleColumn(components) && isAllRows(components)) {
		return composeColumnAddress(components.startColumn);
	}

	if (isSingleRow(components) && isAllColumns(components)) {
		return composeRowAddress(components.startRow);
	}

	if (isAllRows(components)) {
		return composeColumnRangeAddress(components.startColumn, components.endColumn);
	}

	if (isAllColumns(components)) {
		return composeRowRangeAddress(components.startRow, components.endRow);
	}

	if (isSingleColumn(components) && isSingleRow(components)) {
		return composeCellAddress(components.startColumn, components.startRow);
	}

	if (components.startColumn > components.endColumn) {
		throw new InvalidArgumentError("Invalid address. End column is before start column.");
	}
	if (components.startRow > components.endRow) {
		throw new InvalidArgumentError("Invalid address. End row is before start row.");
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

	const newStartRow = offsetToRowAddress(newStartRowIndex as RowOffset);
	const newEndRow = offsetToRowAddress(newEndRowIndex as RowOffset);

	const newStartColumnIndex = columnAddressToOffset(components.startColumn) + columnOffset;
	const newEndColumnIndex = columnAddressToOffset(components.endColumn) + columnOffset;

	if (newStartColumnIndex < columnAddressToOffset(firstColumn) || newEndColumnIndex > columnAddressToOffset(lastColumn)) {
		throw new InvalidArgumentError(`Column offset out of bounds: ${newStartColumnIndex + 1} to ${newEndColumnIndex + 1}`);
	}

	const newStartColumn = offsetToColumnAddress(newStartColumnIndex as ColumnOffset);
	const newEndColumn = offsetToColumnAddress(newEndColumnIndex as ColumnOffset);

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

function isSingleRow(components: AddressComponents): boolean {
	return components.startRow === components.endRow;
}

function isSingleColumn(components: AddressComponents): boolean {
	return components.startColumn === components.endColumn;
}

function isAllColumns(components: AddressComponents): boolean {
	return components.startColumn === firstColumn && components.endColumn === lastColumn;
}

function isAllRows(components: AddressComponents): boolean {
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
