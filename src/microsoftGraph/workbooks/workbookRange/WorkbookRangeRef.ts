import type { WorkbookWorksheetRef } from "../workbookWorksheet/WorkbookWorksheetRef.js";
import type { WorkbookRangeAddress } from "./WorkbookRangeAddress.js";

export type WorkbookRangeRef = WorkbookWorksheetRef & {
    address: WorkbookRangeAddress;
};
