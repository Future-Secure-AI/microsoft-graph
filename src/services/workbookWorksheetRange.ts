
import type { WorkbookRangeAddress, WorkbookRangeAddressUnderlying } from "../models/WorkbookRangeAddress.ts";
import type { WorkbookWorksheetRangeRef } from "../models/WorkbookWorksheetRangeRef.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";

export function workbookWorksheetRangeRef(worksheetRef: WorkbookWorksheetRef, address: WorkbookRangeAddressUnderlying): WorkbookWorksheetRangeRef {
    return {
        ...worksheetRef,
        address: address as WorkbookRangeAddress
    };
}