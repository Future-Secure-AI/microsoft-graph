import type { DataSourceIndex } from "./DataSourceIndex.ts";
import type { RecordBase } from "./RecordBase.ts";
import type { RowNumber } from "./RowNumber.ts";

export type Item<T extends RecordBase> = {
	index: DataSourceIndex;
	rowNumber: RowNumber;
	record: T;
};
