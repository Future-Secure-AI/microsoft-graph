import { isEqual } from "lodash";
import NeverError from "../errors/NeverError.ts";
import type { Cell } from "../models/Cell.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";
import getWorkbookWorksheetUsedRangeAddress from "../operations/workbookWorksheet/getWorkbookWorksheetUsedRangeAddress.ts";
import iterateWorkbookRange from "../tasks/iterateWorkbookRange.ts";
import { createWorkbookRangeRef } from "./workbookRange.ts";

export type ColumnHeading = string & {
	__brand: "ColumnHeading";
};

export type SourceRow = Record<ColumnHeading, Cell>;

export type ItemId = number & {
	__brand: "ItemId";
};

export type RowNumber = number & {
	__brand: "RowNumber";
};

export type Source<T> = {
	rangeRef: WorkbookRangeRef;
	head: ColumnHeading[] | null;
	coding: {
		decode: (row: SourceRow) => T;
		encode: (record: T) => SourceRow;
	};
	cache: Item<T>[];
} & AsyncIterable<Item<T>>;

export type Item<T> = {
	id: ItemId;
	rowNumber: RowNumber;
	record: T;
};

export type NumberFormat = string & {
	__brand: "NumberFormat";
};

export const generalNumberFormat = "General" as NumberFormat;

export async function defineSource<T>(worksheetRef: WorkbookWorksheetRef, decode: (row: SourceRow) => T, encode: (record: T) => SourceRow): Promise<Source<T>> {
	const usedRange = await getWorkbookWorksheetUsedRangeAddress(worksheetRef);
	const rangeRef = createWorkbookRangeRef(worksheetRef, usedRange);

	const coding = {
		decode,
		encode,
	};
	const head: ColumnHeading[] = [];

	const cache: Item<T>[] = [];

	return {
		rangeRef,
		coding,
		head,
		cache,
		async *[Symbol.asyncIterator]() {
			let hasHead = false;

			let index = 0;
			const id = 0 as ItemId;
			for await (const row of iterateWorkbookRange(rangeRef)) {
				if (hasHead) {
					const sourceRow = head.reduce((acc, heading, index) => {
						const cell = row[index];
						if (!cell) {
							throw new NeverError(`Cell at index ${index} is undefined`);
						}
						acc[heading] = cell;
						return acc;
					}, {} as SourceRow);

					const record = decode(sourceRow);

					let item = cache[index];
					if (!(item && isEqual(item.record, record))) {
						const rowNumber = (index + 1) as RowNumber;

						item = cache[index] = {
							id,
							rowNumber,
							record,
						} satisfies Item<T>;
					}

					yield item;
				} else {
					head.splice(0, head.length);
					head.push(...(row.map((cell) => cell.text) as ColumnHeading[]));
					hasHead = true;
				}
				index++;
			}
		},
	};
}

export async function readAllItems<T>(source: Source<T>): Promise<Item<T>[]> {
	const result: Item<T>[] = [];
	for await (const item of source) {
		result.push(item);
	}
	return result;
}

export async function createItem<T>(source: Source<T>, record: T, before: ItemId | null = null): Promise<Item<T>> {
	// TODO
}

export async function updateItem<T>(source: Source<T>, id: ItemId, record: T): Promise<void> {
	// TODO
}

export async function deleteItem<T>(source: Source<T>, id: ItemId): Promise<void> {
	// TODO
}
