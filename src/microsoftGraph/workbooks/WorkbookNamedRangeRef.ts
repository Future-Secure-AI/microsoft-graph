import type { WorkbookRangeName } from "./WorkbookRangeName.js";
import type { WorkbookRef } from "./WorkbookRef.js";

export type WorkbookNamedRangeRef = WorkbookRef & {
    rangeName: WorkbookRangeName;
};
