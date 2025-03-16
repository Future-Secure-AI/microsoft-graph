import type { WorkbookRef } from "../WorkbookRef.js";
import type { WorkbookRangeName } from "./WorkbookRangeName.js";

export type WorkbookNamedRangeRef = WorkbookRef & {
    rangeName: WorkbookRangeName;
};
