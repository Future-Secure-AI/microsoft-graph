/**
 * Tooling for easily creating, updating, and deleting items in a worksheet or range.
 * @module dataSource
 * @category Services
 * @experimental
 */

import InvalidOperationError from "../errors/InvalidOperationError.ts";
import ProtocolError from "../errors/ProtocolError.ts";
import type { Cell, CellText } from "../models/Cell.ts";
import type { ColumnName } from "../models/Column.ts";
import type { DataSource, DataSourceRow, Item, ItemIndex, RecordBase, RowDecoder, RowEncoder } from "../models/DataSource.ts";
import type { RowNumber, RowOffset } from "../models/Row.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import deleteWorkbookRange from "../operations/workbookRange/deleteWorkbookRange.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import insertWorkbookCells from "../operations/workbookRange/insertWorkbookCells.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import getWorkbookWorksheetUsedRangeRef from "../operations/workbookWorksheet/getWorkbookWorksheetUsedRangeRef.ts";
import readWorkbookRows from "../tasks/readWorkbookRows.ts";
import { countAddressRows, subRange, superRange } from "./addressManipulation.ts";
import { addressToCartesian } from "./cartesianAddress.ts";
import { generalCellFormat } from "./cellFormat.ts";

/**
 * Define a datasource from an entire worksheet.
 * @template T Type of the record, extending RecordBase.
 * @param worksheetRef Workbook range reference to define the data source on.
 * @param decode Function to decode a row into a record.
 * @param encode Function to encode a record into a row. Optional.
 * @returns The initialized data source.
 * @experimental
 */
export async function dataSourceFromWorksheet<T extends RecordBase>(worksheetRef: WorkbookRangeRef, decode: RowDecoder<T>, encode: RowEncoder<T> | null = null): Promise<DataSource<T>> {
	const rangeRef = await getWorkbookWorksheetUsedRangeRef(worksheetRef);
	return dataSourceFromRange<T>(rangeRef, decode, encode);
}
/**
 * Defines a data source from a given range.
 * @template T Type of the record, extending RecordBase.
 * @param rangeRef Workbook range reference to define the data source on.
 * @param decode Function to decode a row into a record.
 * @param encode Function to encode a record into a row. Optional.
 * @returns The initialized data source.
 * @experimental
 */
export async function dataSourceFromRange<T extends RecordBase>(rangeRef: WorkbookRangeRef, decode: RowDecoder<T>, encode: RowEncoder<T> | null = null): Promise<DataSource<T>> {
	if (countAddressRows(rangeRef.address) < 1) {
		throw new InvalidOperationError("Cannot create a data source from an empty range. It must at least contain a header row.");
	}

	const headRef = subRange(rangeRef, 0, 1);
	const bodyRef = subRange(rangeRef, 1);
	const head = await getHead(headRef);

	const { ay: bodyOffset } = addressToCartesian(bodyRef.address);

	const source: DataSource<T> = {
		bodyRef,
		bodyOffset,
		coding: {
			decode,
			encode,
		},
		head,
		async *[Symbol.asyncIterator](): AsyncGenerator<Item<T>> {
			let index = 0 as ItemIndex;
			for await (const row of readWorkbookRows(source.bodyRef)) {
				const record = rowToRecord<T>(row, source);
				const rowNumber = indexToRowNumber(source.bodyOffset, index);

				yield {
					index,
					rowNumber,
					record,
				};

				index++;
			}
		},
	};

	return source;
}

/**
 * Reads all items from the data source.
 * @template T Type of the record, extending RecordBase.
 * @param source Data source to read from.
 * @returns Array of all items in the data source.
 * @deprecated Iterate on the source directly using `for await (const item of source)`.
 */
export async function* listItems<T extends RecordBase>(source: DataSource<T>): AsyncIterable<Item<T>> {
	for await (const item of source) {
		yield item;
	}
}

/**
 * Creates a new item in the data source.
 * @template T Type of the record, extending RecordBase.
 * @param source Data source to insert into. Must be initialized.
 * @param record Record to insert.
 * @param after Index after which to insert the new item. If null, inserts at the end. If -1 inserts at top.
 * @returns Newly created item, including its index, row number, and record.
 * @throws {InvalidOperationError} If the data source is not initialized.
 * @throws {InvalidArgumentError} If the 'after' index is out of range.
 * @experimental
 */
export async function createItem<T extends RecordBase>(source: DataSource<T>, record: T, after: ItemIndex | null = null): Promise<Item<T>> {
	const count = countAddressRows(source.bodyRef.address);
	const index = (after === null ? count : after + 1) as ItemIndex;
	const rowNumber = indexToRowNumber(source.bodyOffset, index);

	await insertWorkbookCells(superRange(source.bodyRef, index, 1), "Down");

	source.bodyRef = superRange(source.bodyRef, 0, count + 1);

	await updateItem<T>(source, index, record);

	return {
		index,
		rowNumber,
		record,
	};
}

/**
 * Updates an item in the data source at the specified index.
 * @template T Type of the record, extending RecordBase.
 * @param source Data source to update. Must be initialized.
 * @param index Index of the item to update.
 * @param record New record to write at the specified index.
 * @throws {InvalidOperationError} If the data source is not initialized.
 * @throws {InvalidArgumentError} If the index is out of range.
 * @experimental
 */
export async function updateItem<T extends RecordBase>(source: DataSource<T>, index: ItemIndex, record: T): Promise<void> {
	const row = recordToRow(record, source);
	const rowRef = subRange(source.bodyRef, index, 1);

	await updateWorkbookRange(rowRef, {
		values: [row.map((x) => x.value)],
		text: [row.map((x) => x.text)],
		numberFormat: [row.map((x) => x.format)],
	});
}

/**
 * Deletes an item from the data source at the specified index.
 * @template T Type of the record, extending RecordBase.
 * @param source Data source to delete from. Must be initialized.
 * @param index Index of the item to delete.
 * @throws {InvalidOperationError} If the data source is not initialized.
 * @experimental
 */
export async function deleteItem<T extends RecordBase>(source: DataSource<T>, index: ItemIndex): Promise<void> {
	const rowRef = subRange(source.bodyRef, index, 1);
	await deleteWorkbookRange(rowRef, "Up");
	source.bodyRef = subRange(source.bodyRef, 0, -1);
}

function rowToRecord<T extends RecordBase>(row: Cell[], source: DataSource<T>): T {
	const sourceRow = source.head.reduce((acc, heading, columnIndex) => {
		const cell = row[columnIndex];
		if (!cell) {
			throw new ProtocolError(`Cell for '${heading}' is undefined`);
		}
		acc[heading] = cell;
		return acc;
	}, {} as DataSourceRow);

	const record = source.coding.decode(sourceRow);
	return record;
}

function recordToRow<T extends RecordBase>(record: T, source: DataSource<T>): Cell[] {
	if (!source.coding.encode) {
		throw new InvalidOperationError("Data source does not have an encoder defined. Add an encoder for reading.");
	}

	const sourceRow = source.coding.encode(record);
	const row = source.head.map((heading) => {
		const cell = sourceRow[heading];
		if (cell === undefined) {
			throw new Error(`Encoder produced undefined value for '${heading}'.`); // TODO: Make more specific error
		}

		return {
			value: cell.value ?? "",
			text: cell.text ?? ((cell.value ?? "").toString() as CellText),
			format: cell.format ?? generalCellFormat,
			style: {
				merge: {},
				alignment: {},
				borders: {},
				fill: {},
				font: {},
			},
		} satisfies Cell;
	});
	return row;
}

function indexToRowNumber(bodyOffset: RowOffset, index: ItemIndex): RowNumber {
	return (bodyOffset + index + 1) as RowNumber; // +1 to convert to 1-based index
}

async function getHead(headRef: WorkbookRangeRef) {
	const headRange = await getWorkbookWorksheetRange(headRef);
	const head = headRange.text[0].map((x: string) => x as ColumnName);
	return head;
}
