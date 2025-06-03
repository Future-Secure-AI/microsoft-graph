import type { DataSourceRow } from "./DataSourceRow.ts";
import type { RecordBase } from "./RecordBase.ts";

export type DataSourceEncoder<T extends RecordBase> = (record: T) => DataSourceRow;
