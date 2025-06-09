// import type { ColumnName } from "./ColumnName.ts";
// import type { DataSourceDecoder } from "./DataSourceDecoder.ts";
// import type { DataSourceEncoder } from "./DataSourceEncoder.ts";
// import type { Item } from "./Item.ts";
// import type { RecordBase } from "./RecordBase.ts";
// import type { WorkbookRangeRef } from "./WorkbookRangeRef.ts";

// export type DataSource<T extends RecordBase> = {
// 	rangeRef: WorkbookRangeRef;
// 	head: ColumnName[];
// 	coding: {
// 		decode: DataSourceDecoder<T>;
// 		encode: DataSourceEncoder<T> | null;
// 	};
// } & AsyncIterable<Item<T>>;
