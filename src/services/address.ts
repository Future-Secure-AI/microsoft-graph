import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Address, BoxRangeAddress, CellAddress, ColumnAddress, RowAddress } from "../models/Address.ts";
import type { ColumnIndex } from "../models/ColumnIndex.ts";
import type { RowIndex } from "../models/RowIndex.ts";

const firstColumn = "A";
const lastColumn = "XFD";
const firstRow = "1";
const lastRow = "1048576";

const columnAddressPattern = /^(?<column>[A-Z]+)$/;
const rowAddressPattern = /^(?<row>\d+)$/;
const columnRangeAddressPattern = /^(?<startColumn>[A-Z]+):(?<endColumn>[A-Z]+)$/;
const rowRangeAddressPattern = /^(?<startRow>\d+):(?<endRow>\d+)$/;
const cellAddressPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?<column>[A-Z]+)(?<row>\d+)$/;
const boxRangeAddressPattern = /^(?<startCell>[A-Z]+\d+):(?<endCell>[A-Z]+\d+)$/;

export function getAddressFirstCell(address: Address): CellAddress {
	if (columnAddressPattern.test(address)) {
		return `${address}${firstRow}` as CellAddress;
	}

	if (rowAddressPattern.test(address)) {
		return `${firstColumn}${address}` as CellAddress;
	}

	const columnRangeMatch = address.match(columnRangeAddressPattern);
	if (columnRangeMatch) {
		// biome-ignore lint/complexity/useLiteralKeys: Regex named capture groups are used
		// biome-ignore lint/style/noNonNullAssertion: Regex named capture groups are used
		return `${columnRangeMatch!.groups!["startColumn"]}${firstRow}` as CellAddress;
	}

	const rowRangeMatch = address.match(rowRangeAddressPattern);
	if (rowRangeMatch) {
		// biome-ignore lint/complexity/useLiteralKeys: Regex named capture groups are used
		// biome-ignore lint/style/noNonNullAssertion: Regex named capture groups are used
		return `${firstColumn}${rowRangeMatch!.groups!["startRow"]}` as CellAddress;
	}

	const boxRangeMatch = address.match(boxRangeAddressPattern);
	if (boxRangeMatch) {
		// biome-ignore lint/complexity/useLiteralKeys: Regex named capture groups are used
		// biome-ignore lint/style/noNonNullAssertion: Regex named capture groups are used
		return boxRangeMatch!.groups!["startCell"] as CellAddress;
	}

	if (cellAddressPattern.test(address)) {
		return address as CellAddress;
	}

	throw new InvalidArgumentError(`Invalid address format '${address}'`);
}

export function getAddressLastCell(address: Address): CellAddress {
	if (columnAddressPattern.test(address)) {
		return `${address}${lastRow}` as CellAddress;
	}

	if (rowAddressPattern.test(address)) {
		return `${lastColumn}${address}` as CellAddress;
	}

	const columnRangeMatch = address.match(columnRangeAddressPattern);
	if (columnRangeMatch) {
		// biome-ignore lint/complexity/useLiteralKeys: Regex named capture groups are used
		// biome-ignore lint/style/noNonNullAssertion: Regex named capture groups are used
		return `${columnRangeMatch!.groups!["endColumn"]}${lastRow}` as CellAddress;
	}
	const rowRangeMatch = address.match(rowRangeAddressPattern);
	if (rowRangeMatch) {
		// biome-ignore lint/complexity/useLiteralKeys: Regex named capture groups are used
		// biome-ignore lint/style/noNonNullAssertion: Regex named capture groups are used
		return `${lastColumn}${rowRangeMatch!.groups!["endRow"]}` as CellAddress;
	}

	const boxRangeMatch = address.match(boxRangeAddressPattern);
	if (boxRangeMatch) {
		// biome-ignore lint/complexity/useLiteralKeys: Regex named capture groups are used
		// biome-ignore lint/style/noNonNullAssertion: Regex named capture groups are used
		return boxRangeMatch!.groups!["endCell"] as CellAddress;
	}

	if (cellAddressPattern.test(address)) {
		return address as CellAddress;
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
