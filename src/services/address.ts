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

export function getFirstCell(address: Address): CellAddress {
	const components = decomposeAddress(address);
	return composeCellAddress(components.startColumn, components.startRow);
}

export function getLastCell(address: Address): CellAddress {
	const components = decomposeAddress(address);
	return composeCellAddress(components.endColumn, components.endRow);
}

export function getFirstRow(address: Address): Address {
	const components = decomposeAddress(address);

	return composeAddress({
		startColumn: components.startColumn,
		startRow: components.startRow,
		endColumn: components.endColumn,
		endRow: components.startRow,
	});
}

export function getLastRow(address: Address): Address {
	const components = decomposeAddress(address);

	return composeAddress({
		startColumn: components.startColumn,
		startRow: components.endRow,
		endColumn: components.endColumn,
		endRow: components.endRow,
	});
}

export function getFirstColumn(address: Address): Address {
	const components = decomposeAddress(address);

	return composeAddress({
		startColumn: components.startColumn,
		startRow: components.startRow,
		endColumn: components.startColumn,
		endRow: components.endRow,
	});
}

export function getLastColumn(address: Address): Address {
	const components = decomposeAddress(address);

	return composeAddress({
		startColumn: components.endColumn,
		startRow: components.startRow,
		endColumn: components.endColumn,
		endRow: components.endRow,
	});
}

export function offsetRow(address: Address, offset: number): Address {
	const components = decomposeAddress(address);

	if (isMaxRows(components)) {
		throw new UnsupportedAddressTypeError("All rows are selected. Cannot offset.");
	}

	const newStartRow = Number.parseInt(components.startRow, 10) + offset;
	const newEndRow = Number.parseInt(components.endRow, 10) + offset;

	if (newStartRow < Number.parseInt(firstRow, 10) || newEndRow > Number.parseInt(lastRow, 10)) {
		throw new InvalidArgumentError(`Row offset out of bounds: ${newStartRow} to ${newEndRow}`);
	}

	return composeAddress({
		startColumn: components.startColumn,
		endColumn: components.endColumn,
		startRow: newStartRow.toString() as RowAddress,
		endRow: newEndRow.toString() as RowAddress,
	});
}

export function incrementRow(address: Address): Address {
	return offsetRow(address, +1);
}

export function decrementRow(address: Address): Address {
	return offsetRow(address, -1);
}

/////////

export function cellAddressToIndexes(address: CellAddress): [RowIndex, ColumnIndex] {
	const match = address.match("");
	if (!match?.groups) {
		throw new Error(`Invalid cell format '${address}', must match '${"cellAddressPattern"}`);
	}
	// biome-ignore lint/complexity/useLiteralKeys: Named capture groups are used
	const column = match.groups["column"] as ColumnAddress;
	// biome-ignore lint/complexity/useLiteralKeys: Named capture groups are used
	const row = match.groups["row"] as RowAddress;

	const rowIndex = rowAddressToIndex(row);
	const columnIndex = columnAddressToIndex(column);

	return [rowIndex, columnIndex];
}

export function indexesToCellAddress(rowIndex: RowIndex, columnIndex: ColumnIndex): CellAddress {
	return `${indexToColumnAddress(columnIndex)}${indexToRowAddress(rowIndex)}` as CellAddress;
}

export function indexesToBoxRangeAddress(startRowIndex: RowIndex, startColumnIndex: ColumnIndex, endRowIndex: RowIndex, endColumnIndex: ColumnIndex): CellRangeAddress {
	return `${indexesToCellAddress(startRowIndex, startColumnIndex)}:${indexesToCellAddress(endRowIndex, endColumnIndex)}` as CellRangeAddress;
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

///////////

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
