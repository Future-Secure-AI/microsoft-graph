import type { RecordBase } from "./RecordBase.ts";
import type { SourceRowValue } from "./SourceRowValue.ts";

export type SourceEncoder<T extends RecordBase> = (record: T) => SourceRowValue;
