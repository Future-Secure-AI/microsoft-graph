import type { WorkbookRangeAddress } from "./WorkbookRangeAddress.js";
import type { WorkbookWorksheetRef } from "./WorkbookWorksheetRef.js";

export type WorkbookRangeRef = WorkbookWorksheetRef & {
    address: WorkbookRangeAddress;
};
