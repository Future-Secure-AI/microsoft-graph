import InvalidOperationError from "../errors/InvalidOperationError.ts";
import NeverError from "../errors/NeverError.ts";
import type { Cell } from "../models/Cell.ts";
import type { ColumnName } from "../models/ColumnName.ts";
import type { ColumnOffset } from "../models/ColumnOffset.ts";
import type { Item } from "../models/Item.ts";
import type { RecordBase } from "../models/RecordBase.ts";
import type { RowNumber } from "../models/RowNumber.ts";
import type { RowOffset } from "../models/RowOffset.ts";
import type { Source } from "../models/source.ts";
import type { SourceDecoder } from "../models/SourceDecoder.ts";
import type { SourceEncoder } from "../models/SourceEncoder.ts";
import type { SourceRow } from "../models/SourceRow.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";
import deleteWorkbookRange from "../operations/workbookRange/deleteWorkbookRange.ts";
import insertWorkbookCells from "../operations/workbookRange/insertWorkbookCells.ts";
import setWorkbookRangeFont from "../operations/workbookRange/setWorkbookRangeFont.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import getWorkbookWorksheetUsedRangeAddress from "../operations/workbookWorksheet/getWorkbookWorksheetUsedRangeAddress.ts";
import iterateWorkbookRange from "../tasks/iterateWorkbookRange.ts";
import { countAddressColumns, countAddressRows } from "./addressManipulation.ts";
import { rowOffsetToAddress } from "./addressOffset.ts";
import { addressToCartesian, cartesianToAddress } from "./cartesianAddress.ts";
import { createWorkbookRangeRef } from "./workbookRange.ts";

export async function defineSource<T extends RecordBase>(worksheetRef: WorkbookWorksheetRef, decode: SourceDecoder<T>, encode: SourceEncoder<T>): Promise<Source<T>> {
	const usedRange = await getWorkbookWorksheetUsedRangeAddress(worksheetRef);
	const rangeRef = createWorkbookRangeRef(worksheetRef, usedRange);

	const source: Source<T> = {
		rangeRef,
		coding: {
			decode,
			encode,
		},
		head: [],
		async *[Symbol.asyncIterator](): AsyncGenerator<Item<T>> {
			let hasHead = false;

			for await (const { rowOffset, row } of iterateWorkbookRange(rangeRef)) {
				if (!hasHead) {
					source.head = row.map((cell) => cell.text) as ColumnName[];
					hasHead = true;
					continue;
				}

				const record = rowToRecord<T>(row, source);
				const rowNumber = rowOffsetToNumber(rowOffset);

				yield {
					rowOffset,
					rowNumber,
					record,
				};
			}
		},
	};

	return source;
}

export async function initializeSource<T extends RecordBase>(source: Source<T>, empty: T): Promise<void> {
	if (!isEmpty(source)) {
		throw new InvalidOperationError("Cannot initialize source with non-empty worksheet.");
	}

	source.head = Object.keys(empty) as ColumnName[];

	const address = cartesianToAddress({
		ax: 0 as ColumnOffset,
		bx: (source.head.length - 1) as ColumnOffset,
		ay: 0 as RowOffset,
		by: 0 as RowOffset,
	});
	source.rangeRef = createWorkbookRangeRef(source.rangeRef, address);

	await updateWorkbookRange(source.rangeRef, {
		values: [source.head],
	});
	await setWorkbookRangeFont(source.rangeRef, {
		bold: true,
	});
}

export async function readAllItems<T extends RecordBase>(source: Source<T>): Promise<Item<T>[]> {
	const result: Item<T>[] = [];
	for await (const item of source) {
		result.push(item);
	}
	return result;
}

export async function createItem<T extends RecordBase>(source: Source<T>, record: T, after: RowOffset = 0 as RowOffset): Promise<Item<T>> {
	if (!isInitialized(source)) {
		throw new InvalidOperationError("Source not initialized.");
	}

	await insertWorkbookCells(source.rangeRef, rowOffsetToAddress(after), "Down");

	const row = recordToRow(record, source);

	const address = cartesianToAddress({
		ax: 0 as ColumnOffset,
		bx: (row.length - 1) as ColumnOffset,
		ay: after,
		by: after,
	});
	const rangeRef = createWorkbookRangeRef(source.rangeRef, address);
	await updateWorkbookRange(rangeRef, {
		values: [row],
	});

	const { ax, bx, ay, by } = addressToCartesian(source.rangeRef.address);
	source.rangeRef.address = cartesianToAddress({
		ax,
		bx,
		ay,
		by: (by + 1) as RowOffset,
	});

	return {
		rowOffset: after,
		rowNumber: rowOffsetToNumber(after),
		record,
	};
}

export async function updateItem<T extends RecordBase>(source: Source<T>, offset: RowOffset, record: T): Promise<void> {
	if (!isInitialized(source)) {
		throw new InvalidOperationError("Source not initialized.");
	}

	const row = recordToRow(record, source);

	const address = cartesianToAddress({
		ax: 0 as ColumnOffset,
		bx: (row.length - 1) as ColumnOffset,
		ay: offset,
		by: offset,
	});

	const rangeRef = createWorkbookRangeRef(source.rangeRef, address);
	await updateWorkbookRange(rangeRef, {
		values: [row],
	});
}

export async function deleteItem<T extends RecordBase>(source: Source<T>, offset: RowOffset): Promise<void> {
	if (!isInitialized(source)) {
		throw new InvalidOperationError("Source not initialized.");
	}
	const rangeRef = createWorkbookRangeRef(source.rangeRef, rowOffsetToAddress(offset));
	await deleteWorkbookRange(rangeRef, "Up");

	const { ax, bx, ay, by } = addressToCartesian(source.rangeRef.address);
	source.rangeRef.address = cartesianToAddress({
		ax,
		bx,
		ay,
		by: (by - 1) as RowOffset,
	});
}

function rowToRecord<T extends RecordBase>(row: Cell[], source: Source<T>): T {
	const sourceRow = source.head.reduce((acc, heading, columnIndex) => {
		const cell = row[columnIndex];
		if (!cell) {
			throw new NeverError(`Cell at index ${columnIndex} is undefined`);
		}
		acc[heading] = cell;
		return acc;
	}, {} as SourceRow);

	const record = source.coding.decode(sourceRow);
	return record;
}

function recordToRow<T extends RecordBase>(record: T, source: Source<T>): Cell[] {
	const sourceRow = source.coding.encode(record);
	const row = source.head.map((heading) => {
		const cell = sourceRow[heading];
		if (cell === undefined) {
			throw new NeverError(`Cell at index ${heading} is undefined`);
		}
		return cell;
	});
	return row;
}

function rowOffsetToNumber(offset: RowOffset): RowNumber {
	return (offset + 1) as RowNumber;
}

function isEmpty<T extends RecordBase>(source: Source<T>) {
	return countAddressRows(source.rangeRef.address) <= 1 && countAddressColumns(source.rangeRef.address) <= 1;
}

function isInitialized<T extends RecordBase>(source: Source<T>) {
	return source.head.length > 0;
}

// TODO: Tidy Cell/CellValue types