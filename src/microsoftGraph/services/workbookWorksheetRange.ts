import type { WorkbookRangeAddress } from "../models/WorkbookRangeAddress.ts";
import type { WorkbookWorksheetRangeRef } from "../models/WorkbookWorksheetRangeRef.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";

export function workbookWorksheetRangeRef(worksheetRef: WorkbookWorksheetRef, address: WorkbookRangeAddress): WorkbookWorksheetRangeRef {
    return {
        ...worksheetRef,
        address
    };
}