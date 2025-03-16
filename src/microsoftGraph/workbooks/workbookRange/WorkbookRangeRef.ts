import type { WorkbookWorksheetRef } from "../WorkbookWorksheetRef.js";
import type { WorkbookRangeAddress } from "./WorkbookRangeAddress.js";

export type WorkbookRangeRef = WorkbookWorksheetRef & {
    address: WorkbookRangeAddress;
};
