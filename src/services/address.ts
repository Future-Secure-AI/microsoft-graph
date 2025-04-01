import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Address, CellAddress, CellRangeAddress, ColumnAddress, ColumnRangeAddress, RowAddress, RowRangeAddress } from "../models/Address.ts";
import type { ColumnIndex } from "../models/ColumnIndex.ts";
import type { RowIndex } from "../models/RowIndex.ts";

const firstColumn: ColumnAddress = "A";
const lastColumn: ColumnAddress = "XFD";
const firstRow: RowAddress = "1";
const lastRow: RowAddress = "1048576";

// const unifiedAddressPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?:(?<startColumn>[A-Z]+)?(?<startRow>\d+)?(?::(?<endColumn>[A-Z]+)?(?<endRow>\d+)?)?)$/;

const columnAddressPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?<column>[A-Z]+)$/;
const columnRangeAddressPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?<startColumn>[A-Z]+):(?<endColumn>[A-Z]+)$/;

const rowAddressPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?<row>\d+)$/;
const rowRangeAddressPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?<startRow>\d+):(?<endRow>\d+)$/;

const cellAddressPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?<column>[A-Z]+)(?<row>\d+)$/;
const cellRangeAddressPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?<startColumn>[A-Z]+)(?<startRow>\d+):(?<endColumn>[A-Z]+)(?<endRow>\d+)$/;

export type AddressComponents = {
	startColumn: ColumnAddress;
	endColumn: ColumnAddress;
	startRow: RowAddress;
	endRow: RowAddress;
};

export function decomposeAddress(address: Address): AddressComponents {
	const columnAddressMatch = address.match(columnAddressPattern);
	if (columnAddressMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const column = (columnAddressMatch?.groups?.["column"] ?? "") as ColumnAddress;
		return {
			startColumn: column,
			endColumn: column,
			startRow: firstRow,
			endRow: lastRow,
		};
	}

	const columnRangeMatch = address.match(columnRangeAddressPattern);
	if (columnRangeMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const startColumn = (columnRangeMatch?.groups?.["startColumn"] ?? "") as ColumnAddress;
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const endColumn = (columnRangeMatch?.groups?.["endColumn"] ?? "") as ColumnAddress;
		return {
			startColumn,
			endColumn,
			startRow: firstRow,
			endRow: lastRow,
		};
	}

	const rowAddressMatch = address.match(rowAddressPattern);
	if (rowAddressMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const row = (rowAddressMatch?.groups?.["row"] ?? "") as RowAddress;

		return {
			startColumn: firstColumn,
			endColumn: lastColumn,
			startRow: row,
			endRow: row,
		};
	}

	const rowRangeMatch = address.match(rowRangeAddressPattern);
	if (rowRangeMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const startRow = (rowRangeMatch?.groups?.["startRow"] ?? "") as RowAddress;
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const endRow = (rowRangeMatch?.groups?.["endRow"] ?? "") as RowAddress;
		return {
			startColumn: firstColumn,
			endColumn: lastColumn,
			startRow,
			endRow,
		};
	}

	const cellAddressMatch = address.match(cellAddressPattern);
	if (cellAddressMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const column = (cellAddressMatch?.groups?.["column"] ?? "") as ColumnAddress;
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const row = (cellAddressMatch?.groups?.["row"] ?? "") as RowAddress;
		return {
			startColumn: column,
			endColumn: column,
			startRow: row,
			endRow: row,
		};
	}

	const cellRangeMatch = address.match(cellRangeAddressPattern);
	if (cellRangeMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const startRow = (cellRangeMatch?.groups?.["startRow"] ?? "") as RowAddress;
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const startColumn = (cellRangeMatch?.groups?.["startColumn"] ?? "") as ColumnAddress;
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const endRow = (cellRangeMatch?.groups?.["endRow"] ?? "") as RowAddress;
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const endColumn = (cellRangeMatch?.groups?.["endColumn"] ?? "") as ColumnAddress;
		return {
			startColumn,
			endColumn,
			startRow,
			endRow,
		};
	}

	throw new InvalidArgumentError(`Invalid address format '${address}'`);
}

export function composeAddress(addressComponents: AddressComponents): Address {
	const { startColumn, endColumn, startRow, endRow } = addressComponents;

	// Column
	if (startColumn === endColumn && startRow === firstRow && endRow === lastRow) {
		return composeColumnAddress(startColumn);
	}

	// Row
	if (startColumn === firstColumn && endColumn === lastColumn && startRow === endRow) {
		return composeRowAddress(startRow);
	}

	// Column range
	if (startRow === firstRow && endRow === lastRow) {
		return composeColumnRangeAddress(startColumn, endColumn);
	}

	// Row range
	if (startColumn === firstColumn && endColumn === lastColumn) {
		return composeRowRangeAddress(startRow, endRow);
	}

	// Cell
	if (startColumn === endColumn && startRow === endRow) {
		return composeCellAddress(startColumn, startRow);
	}

	// Cell range
	if (startColumn <= endColumn && startRow <= endRow) {
		return composeCellRangeAddress(startColumn, startRow, endColumn, endRow);
	}

	throw new InvalidArgumentError("Invalid address components.");
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

export function getAddressFirstCell(address: Address): CellAddress {
	const components = decomposeAddress(address);
	return composeCellAddress(components.startColumn, components.startRow);
}

export function getAddressLastCell(address: Address): CellAddress {
	const components = decomposeAddress(address);
	return composeCellAddress(components.endColumn, components.endRow);
}

export function getFirstRow(address: Address): RowAddress | CellRangeAddress {
	const components = decomposeAddress(address);
	if (components.startColumn === firstColumn && components.endColumn === lastColumn) {
		return composeRowAddress(components.startRow);
	}

	return composeCellRangeAddress(components.startColumn, components.startRow, components.endColumn, components.startRow);
}

export function getLastRow(address: Address): RowAddress | CellRangeAddress {
	const components = decomposeAddress(address);
	if (components.startColumn === firstColumn && components.endColumn === lastColumn) {
		return composeRowAddress(components.endRow);
	}

	return composeCellRangeAddress(components.startColumn, components.endRow, components.endColumn, components.endRow);
}

export function getFirstColumn(address: Address): ColumnAddress | CellRangeAddress {
	const components = decomposeAddress(address);
	if (components.startRow === firstRow && components.endRow === lastRow) {
		return composeColumnAddress(components.startColumn);
	}

	return composeCellRangeAddress(components.startColumn, components.startRow, components.startColumn, components.endRow);
}

export function getLastColumn(address: Address): ColumnAddress | CellRangeAddress {
	const components = decomposeAddress(address);
	if (components.startRow === firstRow && components.endRow === lastRow) {
		return composeColumnAddress(components.startColumn);
	}

	return composeCellRangeAddress(components.endColumn, components.startRow, components.endColumn, components.endRow);
}

export function offsetRow(address: Address, offset: number): RowAddress | RowRangeAddress | CellRangeAddress {
	const components = decomposeAddress(address);

	const startRow = Number.parseInt(components.startRow, 10) + offset;
	const endRow = Number.parseInt(components.endRow, 10) + offset;

	if (startRow < Number.parseInt(firstRow, 10) || endRow > Number.parseInt(lastRow, 10)) {
		throw new InvalidArgumentError(`Row offset out of bounds: ${startRow} to ${endRow}`);
	}

	if (components.startColumn === firstColumn && components.endColumn === lastColumn) {
		if (startRow === endRow) {
			return composeRowAddress(startRow.toString());
		}
		return composeRowRangeAddress(startRow.toString(), endRow.toString());
	}

	return composeCellRangeAddress(startRow.toString(), components.startColumn, endRow.toString(), components.endColumn);
}

export function incrementRow(address: Address): Address {
	return offsetRow(address, +1);
}

export function decrementRow(address: Address): Address {
	return offsetRow(address, -1);
}

export function cellAddressToIndexes(address: CellAddress): [RowIndex, ColumnIndex] {
	const match = address.match(cellAddressPattern);
	if (!match?.groups) {
		throw new Error(`Invalid cell format '${address}', must match '${cellAddressPattern}`);
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
