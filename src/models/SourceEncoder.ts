import type { RecordBase } from "./RecordBase.ts";
import type { SourceRow } from "./SourceRow.ts";

export type SourceEncoder<T extends RecordBase> = (record: T) => SourceRow;
