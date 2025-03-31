import type { Cell } from "../models/Cell.ts";
import type { Column } from "../models/Column.ts";
import type { ColumnIndex } from "../models/ColumnIndex.ts";
import type { RangeAddress } from "../models/RangeAddress.ts";
import type { Row } from "../models/Row.ts";
import type { RowIndex } from "../models/RowIndex.ts";

// TODO: Tidy this 

const cellPattern = /^(?<sheet>[A-Za-z0-9_]+!)?(?<column>[A-Z]+)(?<row>\d+)$/; // Matches "A2" or "Sheet1!A2"

export function getAddressStart(address: RangeAddress): Cell {
	return address.split(":", 2)[0] as Cell;
}

export function getAddressEnd(address: RangeAddress): Cell {
	return (address.includes(":") ? address.split(":", 2)[1] : address) as Cell;
}

export function cellToIndexes(cell: Cell): [RowIndex, ColumnIndex] {
	const match = cell.match(cellPattern);
	if (!match?.groups) {
		throw new Error(`Invalid cell format '${cell}', must match '${cellPattern}`);
	}
	// biome-ignore lint/complexity/useLiteralKeys: Named capture groups are used
	const column = match.groups["column"] as Column;
	// biome-ignore lint/complexity/useLiteralKeys: Named capture groups are used
	const row = match.groups["row"] as Row;

	const rowIndex = rowToIndex(row);
	const columnIndex = columnToIndex(column);
	
	return [rowIndex, columnIndex];
}


export function indexesToCell(rowIndex: RowIndex, columnIndex: ColumnIndex): Cell {
	return `${indexToColumn(columnIndex)}${indexToRow(rowIndex)}` as Cell;
}

export function indexesToBox(startRowIndex:RowIndex, startColumnIndex: ColumnIndex, endRowIndex: RowIndex, endColumnIndex: ColumnIndex): RangeAddress {
	return `${indexesToCell(startRowIndex, startColumnIndex)}:${indexesToCell(endRowIndex, endColumnIndex)}` as RangeAddress;
}

export function columnToIndex(column: Column): ColumnIndex {
	let index = 0;
	for (let i = 0; i < column.length; i++) {
		index = index * 26 + (column.charCodeAt(i) - 65 + 1);
	}
	return (index - 1) as ColumnIndex;
}

export function indexToColumn(index: ColumnIndex): Column {
	let result = "";
	let currentIndex = index + 1;
	while (currentIndex > 0) {
		currentIndex -= 1;
		result = String.fromCharCode((currentIndex % 26) + 65) + result;
		currentIndex = Math.floor(currentIndex / 26);
	}
	return result as Column;
}

export function rowToIndex(row: Row): RowIndex {
	return (Number.parseInt(row, 10) - 1) as RowIndex;
}

export function indexToRow(index: RowIndex): Row {
	return (index + 1).toString() as Row;
}
