// import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
// import InvalidOperationError from "../errors/InvalidOperationError.ts";
// import NeverError from "../errors/NeverError.ts";
// import type { Cell } from "../models/Cell.ts";
// import type { ColumnName } from "../models/ColumnName.ts";
// import type { ColumnOffset } from "../models/ColumnOffset.ts";
// import type { DataSource } from "../models/DataSource.ts";
// import type { DataSourceDecoder } from "../models/DataSourceDecoder.ts";
// import type { DataSourceEncoder } from "../models/DataSourceEncoder.ts";
// import type { DataSourceIndex } from "../models/DataSourceIndex.ts";
// import type { DataSourceRow } from "../models/DataSourceRow.ts";
// import type { Item } from "../models/Item.ts";
// import type { RangeOperationCallback } from "../models/RangeOperationCallback.ts";
// import type { RecordBase } from "../models/RecordBase.ts";
// import type { RowNumber } from "../models/RowNumber.ts";
// import type { RowOffset } from "../models/RowOffset.ts";
// import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
// import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";
// import deleteWorkbookRange from "../operations/workbookRange/deleteWorkbookRange.ts";
// import insertWorkbookCells from "../operations/workbookRange/insertWorkbookCells.ts";
// import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
// import readWorkbookRows from "../tasks/readWorkbookRows.ts";
// import { countAddressColumns, countAddressRows } from "./addressManipulation.ts";
// import { rowOffsetToAddress } from "./addressOffset.ts";
// import { addressToCartesian, cartesianToAddress } from "./cartesianAddress.ts";
// import { createWorkbookRangeRef } from "./workbookRange.ts";

// /**
//  * Define a range and create a data source on it. From there you can read, update, create, insert and delete items with a given encoding and decoding strategy.
//  * @param parentRef
//  * @param decode
//  * @param encode
//  * @returns
//  */
// export async function defineDataSource<T extends RecordBase>(parentRef: WorkbookWorksheetRef | WorkbookRangeRef, decode: DataSourceDecoder<T>, encode: DataSourceEncoder<T> | null = null): Promise<DataSource<T>> {
// 	const rangeRef = "address" in parentRef ? parentRef : createWorkbookRangeRef(parentRef, "A1");

// 	const source: DataSource<T> = {
// 		rangeRef,
// 		coding: {
// 			decode,
// 			encode,
// 		},
// 		head: [],
// 		async *[Symbol.asyncIterator](): AsyncGenerator<Item<T>> {
// 			const { ay } = addressToCartesian(this.rangeRef.address);

// 			let hasHead = false;
// 			let index = 0 as DataSourceIndex;
// 			for await (const row of readWorkbookRows(source.rangeRef)) {
// 				if (!hasHead) {
// 					source.head = row.map((cell) => cell.text as unknown as ColumnName);
// 					hasHead = true;
// 					continue;
// 				}

// 				const record = rowToRecord<T>(row, source);
// 				const rowNumber = indexToRowNumber(ay, index);

// 				yield {
// 					index,
// 					rowNumber,
// 					record,
// 				};

// 				index++;
// 			}
// 		},
// 	};

// 	return source;
// }

// export async function initializeDataSource<T extends RecordBase>(source: DataSource<T>, empty: T, formatHeader: RangeOperationCallback | null = null): Promise<void> {
// 	if (!isEmpty(source)) {
// 		throw new InvalidOperationError("Cannot initialize source with non-empty range.");
// 	}

// 	const { ax, ay } = addressToCartesian(source.rangeRef.address);
// 	const address = cartesianToAddress({
// 		ax,
// 		bx: (ax + source.head.length - 1) as ColumnOffset,
// 		ay,
// 		by: ay,
// 	});
// 	await insertWorkbookCells(source.rangeRef, address, "Right");

// 	source.rangeRef = createWorkbookRangeRef(source.rangeRef, address);
// 	source.head = Object.keys(empty) as ColumnName[];

// 	await updateWorkbookRange(source.rangeRef, {
// 		values: [source.head],
// 	});

// 	if (formatHeader) {
// 		await formatHeader(source.rangeRef);
// 	}
// }

// export async function readAllItems<T extends RecordBase>(source: DataSource<T>): Promise<Item<T>[]> {
// 	const result: Item<T>[] = [];
// 	for await (const item of source) {
// 		result.push(item);
// 	}
// 	return result;
// }

// export async function createItem<T extends RecordBase>(source: DataSource<T>, record: T, after: DataSourceIndex | null = null): Promise<Item<T>> {
// 	if (isEmpty(source)) {
// 		throw new InvalidOperationError("Source not initialized.");
// 	}

// 	const { ax, bx, ay, by } = addressToCartesian(source.rangeRef.address);
// 	const index = after ?? offsetToIndex(by);
// 	const rowNumber = indexToRowNumber(ay, index);

// 	const rowOffset = indexToOffset(ay, index);
// 	if (rowOffset <= ay || rowOffset > by) {
// 		throw new InvalidArgumentError(`'after' is out of range. Range is from ${offsetToIndex(ay)} to ${offsetToIndex(by)}, but 'after' index is ${offsetToIndex(rowOffset)}.`);
// 	}

// 	source.rangeRef.address = cartesianToAddress({
// 		ax,
// 		bx,
// 		ay,
// 		by: (by + 1) as RowOffset,
// 	});

// 	await insertWorkbookCells(source.rangeRef, rowOffsetToAddress(indexToOffset(ay, index)), "Down");
// 	await updateItem<T>(source, index, record);

// 	return {
// 		index,
// 		rowNumber,
// 		record,
// 	};
// }

// function indexToOffset(rowOffset: RowOffset, index: DataSourceIndex): RowOffset {
// 	return (rowOffset + index + 1) as RowOffset; // +1 to account for the header row
// }

// function indexToRowNumber(rowOffset: RowOffset, index: DataSourceIndex): RowNumber {
// 	return (rowOffset + index + 2) as RowNumber; // +1 to account for the header row, +1 to convert to 1-based index
// }

// function offsetToIndex(rowOffset: RowOffset): DataSourceIndex {
// 	return (rowOffset - 1) as DataSourceIndex; // -1 to convert from 1-based index to 0-based index
// }

// export async function updateItem<T extends RecordBase>(source: DataSource<T>, index: DataSourceIndex, record: T): Promise<void> {
// 	if (isEmpty(source)) {
// 		throw new InvalidOperationError("Source not initialized.");
// 	}

// 	const row = recordToRow(record, source);

// 	const { ax, bx, ay, by } = addressToCartesian(source.rangeRef.address);

// 	const rowOffset = indexToOffset(ay, index);
// 	if (rowOffset <= ay || rowOffset > by) {
// 		throw new InvalidArgumentError(`'after' is out of range. Range is from ${offsetToIndex(ay)} to ${offsetToIndex(by)}, but 'after' index is ${offsetToIndex(rowOffset)}.`);
// 	}
// 	const rangeRef = createWorkbookRangeRef(
// 		source.rangeRef,
// 		cartesianToAddress({
// 			ax,
// 			bx,
// 			ay: (ay + index) as RowOffset,
// 			by: (ay + index) as RowOffset,
// 		}),
// 	);
// 	await updateWorkbookRange(rangeRef, {
// 		values: [row.map((x) => x.value)],
// 		text: [row.map((x) => x.text)],
// 		numberFormat: [row.map((x) => x.numberFormat)],
// 	});
// }

// export async function deleteItem<T extends RecordBase>(source: DataSource<T>, index: DataSourceIndex): Promise<void> {
// 	if (isEmpty(source)) {
// 		throw new InvalidOperationError("Source not initialized.");
// 	}
// 	const { ax, bx, ay, by } = addressToCartesian(source.rangeRef.address);
// 	source.rangeRef.address = cartesianToAddress({
// 		ax,
// 		bx,
// 		ay,
// 		by: (by - 1) as RowOffset,
// 	});

// 	const rangeRef = createWorkbookRangeRef(source.rangeRef, rowOffsetToAddress(indexToOffset(ay, index)));
// 	await deleteWorkbookRange(rangeRef, "Up");
// }

// function rowToRecord<T extends RecordBase>(row: Cell[], source: DataSource<T>): T {
// 	const sourceRow = source.head.reduce((acc, heading, columnIndex) => {
// 		const cell = row[columnIndex];
// 		if (!cell) {
// 			throw new NeverError(`Cell at index ${columnIndex} is undefined`);
// 		}
// 		acc[heading] = cell;
// 		return acc;
// 	}, {} as DataSourceRow);

// 	const record = source.coding.decode(sourceRow);
// 	return record;
// }

// function recordToRow<T extends RecordBase>(record: T, source: DataSource<T>): Cell[] {
// 	if (!source.coding.encode) {
// 		throw new InvalidOperationError("Data source does not have an encoder defined.");
// 	}

// 	const sourceRow = source.coding.encode(record);
// 	const row = source.head.map((heading) => {
// 		const cell = sourceRow[heading];
// 		if (cell === undefined) {
// 			throw new NeverError(`Cell at index ${heading} is undefined`);
// 		}
// 		return cell;
// 	});
// 	return row;
// }

// function isEmpty<T extends RecordBase>(source: DataSource<T>) {
// 	return countAddressRows(source.rangeRef.address) <= 1 && countAddressColumns(source.rangeRef.address) <= 1; // TODO: It is possible that a data source has a single heading with no records
// }
