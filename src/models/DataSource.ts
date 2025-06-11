import type { Cell, CellValue } from "./Cell.ts";
import type { ColumnName } from "./Column.ts";
import type { RowNumber, RowOffset } from "./Row.ts";
import type { WorkbookRangeRef } from "./WorkbookRange.ts";

export type DataSource<T extends RecordBase> = {
	bodyRef: WorkbookRangeRef;
	bodyOffset: RowOffset;
	head: ColumnName[];
	coding: {
		decode: RowDecoder<T>;
		encode: RowEncoder<T> | null;
	};
} & AsyncIterable<Item<T>>;

export type RowDecoder<T extends RecordBase> = (row: DataSourceRow) => T;
export type RowEncoder<T extends RecordBase> = (record: T) => DataSourceRow;

export type ItemIndex = number & {
	__brand: "ItemIndex";
};

export type Item<T extends RecordBase> = {
	index: ItemIndex;
	rowNumber: RowNumber;
	record: T;
};

export type RecordBase = Record<string, CellValue>;
export type DataSourceRow = Record<ColumnName, Partial<Cell>>;
export type RangeOperationCallback = (rangeRef: WorkbookRangeRef) => Promise<void>;
