import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import UnsupportedAddressTypeError from "../errors/UnsupportedAddressTypeError.ts";
import type { Address, CellAddress, CellRangeAddress, ColumnAddress, ColumnRangeAddress, RowAddress, RowRangeAddress } from "../models/Address.ts";
import type { ColumnIndex } from "../models/ColumnIndex.ts";
import type { RowIndex } from "../models/RowIndex.ts";

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

export function composeAddress(components: AddressComponents): Address {
	if (isSingleColumn(components) && isMaxRows(components)) {
		return composeColumnAddress(components.startColumn);
	}

	if (isSingleRow(components) && isMaxColumns(components)) {
		return composeRowAddress(components.startRow);
	}

	if (isMaxRows(components)) {
		return composeColumnRangeAddress(components.startColumn, components.endColumn);
	}

	if (isMaxColumns(components)) {
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

export function getFirstCellAddress(address: Address): CellAddress {
	const components = decomposeAddress(address);
	return composeCellAddress(components.startColumn, components.startRow);
}

export function getLastCellAddress(address: Address): CellAddress {
	const components = decomposeAddress(address);
	return composeCellAddress(components.endColumn, components.endRow);
}

export function getFirstRowAddress(address: Address): Address {
	const components = decomposeAddress(address);

	return composeAddress({
		startColumn: components.startColumn,
		startRow: components.startRow,
		endColumn: components.endColumn,
		endRow: components.startRow,
	});
}

export function getLastRowAddress(address: Address): Address {
	const components = decomposeAddress(address);

	return composeAddress({
		startColumn: components.startColumn,
		startRow: components.endRow,
		endColumn: components.endColumn,
		endRow: components.endRow,
	});
}

export function getFirstColumnAddress(address: Address): Address {
	const components = decomposeAddress(address);

	return composeAddress({
		startColumn: components.startColumn,
		startRow: components.startRow,
		endColumn: components.startColumn,
		endRow: components.endRow,
	});
}

export function getLastColumnAddress(address: Address): Address {
	const components = decomposeAddress(address);

	return composeAddress({
		startColumn: components.endColumn,
		startRow: components.startRow,
		endColumn: components.endColumn,
		endRow: components.endRow,
	});
}

export function offsetAddress(address: Address, rowOffset: number, columnOffset: number): Address {
	const components = decomposeAddress(address);

	if (isMaxRows(components) && rowOffset !== 0) {
		throw new UnsupportedAddressTypeError("All rows are selected. Cannot offset rows.");
	}

	if (isMaxColumns(components) && columnOffset !== 0) {
		throw new UnsupportedAddressTypeError("All columns are selected. Cannot offset columns.");
	}

	const newStartRow = rowOffset !== 0 ? indexToRowAddress((rowAddressToIndex(components.startRow) + rowOffset) as RowIndex) : components.startRow;
	const newEndRow = rowOffset !== 0 ? indexToRowAddress((rowAddressToIndex(components.endRow) + rowOffset) as RowIndex) : components.endRow;

	if (rowAddressToIndex(newStartRow) < rowAddressToIndex(firstRow) || rowAddressToIndex(newEndRow) > rowAddressToIndex(lastRow)) {
		throw new InvalidArgumentError(`Row offset out of bounds: ${newStartRow} to ${newEndRow}`);
	}

	const newStartColumn = columnOffset !== 0 ? indexToColumnAddress((columnAddressToIndex(components.startColumn) + columnOffset) as ColumnIndex) : components.startColumn;
	const newEndColumn = columnOffset !== 0 ? indexToColumnAddress((columnAddressToIndex(components.endColumn) + columnOffset) as ColumnIndex) : components.endColumn;

	if (columnAddressToIndex(newStartColumn) < columnAddressToIndex(firstColumn) || columnAddressToIndex(newEndColumn) > columnAddressToIndex(lastColumn)) {
		throw new InvalidArgumentError(`Column offset out of bounds: ${newStartColumn} to ${newEndColumn}`);
	}

	return composeAddress({
		startColumn: newStartColumn as ColumnAddress,
		endColumn: newEndColumn as ColumnAddress,
		startRow: newStartRow as RowAddress,
		endRow: newEndRow as RowAddress,
	});
}

export function incrementRowAddress(address: Address): Address {
	return offsetAddress(address, +1, 0);
}

export function decrementRowAddress(address: Address): Address {
	return offsetAddress(address, -1, 0);
}

export function isAddressOverlapping(address1: Address, address2: Address): boolean {
	const components1 = decomposeAddress(address1);
	const components2 = decomposeAddress(address2);

	return components1.startColumn <= components2.endColumn && components1.endColumn >= components2.startColumn && rowAddressToIndex(components1.startRow) <= rowAddressToIndex(components2.endRow) && rowAddressToIndex(components1.endRow) >= rowAddressToIndex(components2.startRow);
}

export function columnAddressToIndex(column: ColumnAddress): ColumnIndex {
	let index = 0;
	for (let i = 0; i < column.length; i++) {
		index = index * 26 + (column.charCodeAt(i) - 65 + 1);
	}
	return (index - 1) as ColumnIndex;
}

export function indexToColumnAddress(index: ColumnIndex): ColumnAddress {
	let result = "";
	let currentIndex = index + 1;
	while (currentIndex > 0) {
		currentIndex -= 1;
		result = String.fromCharCode((currentIndex % 26) + 65) + result;
		currentIndex = Math.floor(currentIndex / 26);
	}
	return result as ColumnAddress;
}

export function rowAddressToIndex(row: RowAddress): RowIndex {
	return (Number.parseInt(row, 10) - 1) as RowIndex;
}

export function indexToRowAddress(index: RowIndex): RowAddress {
	return (index + 1).toString() as RowAddress;
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

function isSingleRow(components: AddressComponents) {
	return components.startRow === components.endRow;
}

function isSingleColumn(components: AddressComponents) {
	return components.startColumn === components.endColumn;
}

function isMaxColumns(components: AddressComponents) {
	return components.startColumn === firstColumn && components.endColumn === lastColumn;
}

function isMaxRows(components: AddressComponents) {
	return components.startRow === firstRow && components.endRow === lastRow;
}
