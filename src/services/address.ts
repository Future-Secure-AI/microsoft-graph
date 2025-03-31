import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Address, BoxRangeAddress, CellAddress, ColumnAddress, RowAddress } from "../models/Address.ts";
import type { ColumnIndex } from "../models/ColumnIndex.ts";
import type { RowIndex } from "../models/RowIndex.ts";

const firstColumn = "A";
const lastColumn = "XFD";
const firstRow = "1";
const lastRow = "1048576";

const columnAddressPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?<column>[A-Z]+)$/;
const rowAddressPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?<row>\d+)$/;
const columnRangeAddressPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?<startColumn>[A-Z]+):(?<endColumn>[A-Z]+)$/;
const rowRangeAddressPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?<startRow>\d+):(?<endRow>\d+)$/;
const cellAddressPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?<column>[A-Z]+)(?<row>\d+)$/;
const boxRangeAddressPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?<startCell>[A-Z]+\d+):(?<endCell>[A-Z]+\d+)$/;

export function getAddressFirstCell(address: Address): CellAddress {
	const columnAddressMatch = address.match(columnAddressPattern);
	if (columnAddressMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const column = columnAddressMatch?.groups?.["column"] ?? "";
		return `${column}${firstRow}` as CellAddress;
	}

	const rowAddressMatch = address.match(rowAddressPattern);
	if (rowAddressMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const row = rowAddressMatch?.groups?.["row"] ?? "";
		return `${firstColumn}${row}` as CellAddress;
	}

	const columnRangeMatch = address.match(columnRangeAddressPattern);
	if (columnRangeMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const startColumn = columnRangeMatch?.groups?.["startColumn"] ?? "";
		return `${startColumn}${firstRow}` as CellAddress;
	}

	const rowRangeMatch = address.match(rowRangeAddressPattern);
	if (rowRangeMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const startRow = rowRangeMatch?.groups?.["startRow"] ?? "";
		return `${firstColumn}${startRow}` as CellAddress;
	}

	const boxRangeMatch = address.match(boxRangeAddressPattern);
	if (boxRangeMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const startCell = boxRangeMatch?.groups?.["startCell"];
		return startCell as CellAddress;
	}

	const cellAddressMatch = address.match(cellAddressPattern);
	if (cellAddressMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const column = cellAddressMatch?.groups?.["column"] ?? "";
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const row = cellAddressMatch?.groups?.["row"] ?? "";
		return (column + row) as CellAddress;
	}

	throw new InvalidArgumentError(`Invalid address format '${address}'`);
}

export function getAddressLastCell(address: Address): CellAddress {
	const columnAddressMatch = address.match(columnAddressPattern);
	if (columnAddressMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const column = columnAddressMatch?.groups?.["column"] ?? "";
		return `${column}${lastRow}` as CellAddress;
	}

	const rowAddressMatch = address.match(rowAddressPattern);
	if (rowAddressMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const row = rowAddressMatch?.groups?.["row"] ?? "";
		return `${lastColumn}${row}` as CellAddress;
	}

	const columnRangeMatch = address.match(columnRangeAddressPattern);
	if (columnRangeMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const endColumn = columnRangeMatch?.groups?.["endColumn"] ?? "";
		return `${endColumn}${lastRow}` as CellAddress;
	}
	const rowRangeMatch = address.match(rowRangeAddressPattern);
	if (rowRangeMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const endRow = rowRangeMatch?.groups?.["endRow"] ?? "";
		return `${lastColumn}${endRow}` as CellAddress;
	}

	const boxRangeMatch = address.match(boxRangeAddressPattern);
	if (boxRangeMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const endCell = boxRangeMatch?.groups?.["endCell"];
		return endCell as CellAddress;
	}

	const cellAddressMatch = address.match(cellAddressPattern);
	if (cellAddressMatch) {
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const column = cellAddressMatch?.groups?.["column"] ?? "";
		// biome-ignore lint/complexity/useLiteralKeys:Regex named capture groups are used
		const row = cellAddressMatch?.groups?.["row"] ?? "";
		return (column + row) as CellAddress;
	}

	throw new Error(`Invalid address format '${address}'`);
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

export function indexesToBoxRangeAddress(startRowIndex: RowIndex, startColumnIndex: ColumnIndex, endRowIndex: RowIndex, endColumnIndex: ColumnIndex): BoxRangeAddress {
	return `${indexesToCellAddress(startRowIndex, startColumnIndex)}:${indexesToCellAddress(endRowIndex, endColumnIndex)}` as BoxRangeAddress;
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
