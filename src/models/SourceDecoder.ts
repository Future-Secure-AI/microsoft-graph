import type { RecordBase } from "./RecordBase.ts";
import type { SourceRow } from "./SourceRow.ts";

export type SourceDecoder<T extends RecordBase> = (row: SourceRow) => T;
