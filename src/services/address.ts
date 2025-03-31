import type { BoxRangeAddress, CellAddress, ColumnAddress, RowAddress } from "../models/Address.ts";
import type { ColumnIndex } from "../models/ColumnIndex.ts";
import type { RowIndex } from "../models/RowIndex.ts";

const cellAddressPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?<column>[A-Z]+)(?<row>\d+)$/; // Matches "A2" or "Sheet1!A2". We ignore the sheet since it's handle upstream

export function getBoxRangeFirstCell(address: BoxRangeAddress): CellAddress {
	return address.split(":", 2)[0] as CellAddress;
}

export function getBoxRangeLastCell(address: BoxRangeAddress): CellAddress {
	return (address.includes(":") ? address.split(":", 2)[1] : address) as CellAddress;
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
