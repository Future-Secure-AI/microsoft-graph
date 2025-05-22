import type { RowOffset } from "../models/RowOffset.ts";
import type { RecordBase } from "./RecordBase.ts";
import type { RowNumber } from "./RowNumber.ts";

export type Item<T extends RecordBase> = {
	rowOffset: RowOffset;
	rowNumber: RowNumber;
	record: T;
};
