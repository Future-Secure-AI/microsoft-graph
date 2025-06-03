import type { DataSourceRow } from "./DataSourceRow.ts";
import type { RecordBase } from "./RecordBase.ts";

export type DataSourceDecoder<T extends RecordBase> = (row: DataSourceRow) => T;
