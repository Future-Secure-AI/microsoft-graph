import type { WorkbookRangeAddress } from "../models/WorkbookRangeAddress.js";
import type { WorkbookWorksheetRangeRef } from "../models/WorkbookWorksheetRangeRef.js";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.js";

export function workbookWorksheetRangeRef(worksheetRef: WorkbookWorksheetRef, address: WorkbookRangeAddress): WorkbookWorksheetRangeRef {
    return {
        ...worksheetRef,
        address
    };
}