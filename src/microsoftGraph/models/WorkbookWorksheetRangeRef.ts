import type { WorkbookRangeAddress as WorkbookWorksheetRangeAddress } from "./WorkbookRangeAddress.js";
import type { WorkbookWorksheetRef } from "./WorkbookWorksheetRef.js";

export type WorkbookWorksheetRangeRef = WorkbookWorksheetRef & {
    address: WorkbookWorksheetRangeAddress;
};
