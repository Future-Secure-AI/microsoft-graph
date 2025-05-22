import type { ColumnHeading } from "./ColumnHeading.ts";
import type { Item } from "./Item.ts";
import type { RecordBase } from "./RecordBase.ts";
import type { SourceDecoder } from "./SourceDecoder.ts";
import type { SourceEncoder } from "./SourceEncoder.ts";
import type { WorkbookRangeRef } from "./WorkbookRangeRef.ts";

export type Source<T extends RecordBase> = {
	rangeRef: WorkbookRangeRef;
	head: ColumnHeading[];
	coding: {
		decode: SourceDecoder<T>;
		encode: SourceEncoder<T>;
	};
} & AsyncIterable<Item<T>>;
