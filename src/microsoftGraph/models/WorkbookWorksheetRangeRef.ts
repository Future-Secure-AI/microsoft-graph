import type { WorkbookRangeAddress as WorkbookWorksheetRangeAddress } from "./WorkbookRangeAddress.ts";
import type { WorkbookWorksheetRef } from "./WorkbookWorksheetRef.ts";

export type WorkbookWorksheetRangeRef = WorkbookWorksheetRef & {
    address: WorkbookWorksheetRangeAddress;
};
