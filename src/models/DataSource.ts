/**
 * Tooling for easily creating, updating, and deleting items in a worksheet or range.
 * @module DataSource
 * @category Models
 */

import type { Cell, CellValue } from "./Cell.ts";
import type { ColumnName } from "./Column.ts";
import type { RowNumber, RowOffset } from "./Row.ts";
import type { WorkbookRangeRef } from "./WorkbookRange.ts";

/**
 * Defines a data source for a worksheet or range.
 * @template T Type of the record, extending RecordBase.
 */
export type DataSource<T extends RecordBase> = {
	bodyRef: WorkbookRangeRef;
	bodyOffset: RowOffset;
	head: ColumnName[];
	coding: {
		decode: RowDecoder<T>;
		encode: RowEncoder<T> | null;
	};
} & AsyncIterable<Item<T>>;

/**
 * Method to decode row into a record.
 */
export type RowDecoder<T extends RecordBase> = (row: DataSourceRow) => T;

/**
 * Method to encode a record into a row.
 */
export type RowEncoder<T extends RecordBase> = (record: T) => DataSourceRow;

/**
 * Item's position within a data source.
 */
export type ItemIndex = number & {
	__brand: "ItemIndex";
};

/**
 * Item within a data source.
 */
export type Item<T extends RecordBase> = {
	index: ItemIndex;
	rowNumber: RowNumber;
	record: T;
};

export type RecordBase = Record<string, CellValue>;
export type DataSourceRow = Record<ColumnName, Partial<Cell>>;
export type RangeOperationCallback = (rangeRef: WorkbookRangeRef) => Promise<void>;
