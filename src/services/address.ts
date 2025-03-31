import type { Cell } from "../models/Cell.ts";
import type { Column } from "../models/Column.ts";
import type { ColumnIndex } from "../models/ColumnIndex.ts";
import type { RangeAddress } from "../models/RangeAddress.ts";
import type { Row } from "../models/Row.ts";
import type { RowIndex } from "../models/RowIndex.ts";

const cellPattern = /^([A-Z]+)(\d+)$/;

export function getAddressStart(address: RangeAddress): Cell {
	return address.split(":", 2)[0] as Cell;
}

export function getAddressEnd(address: RangeAddress): Cell {
	return (address.includes(":") ? address.split(":", 2)[1] : address) as Cell;
}

export function cellToIndexes(cell: Cell): [RowIndex, ColumnIndex] {
	const match = cell.match(cellPattern);
	if (!match) {
		throw new Error(`Invalid cell format: ${cell}`);
	}
	const [, column, row] = match;
	return [rowToIndex(row as Row), columnToIndex(column as Column)];
}


export function indexesToCell(row: RowIndex, col: ColumnIndex): Cell {
	return `${indexToColumn(col)}${indexToRow(row)}` as Cell;
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
