import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";

export type RangeOperationCallback = (rangeRef: WorkbookRangeRef) => Promise<void>;
