
import type { WorkbookRangeAddress, WorkbookRangeAddressUnderlying } from "../models/WorkbookRangeAddress.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";

export function workbookRangeRef(worksheetRef: WorkbookWorksheetRef, address: WorkbookRangeAddressUnderlying): WorkbookRangeRef {
    return {
        siteId: worksheetRef.siteId,
        driveId: worksheetRef.driveId,
        itemId: worksheetRef.itemId,
        sessionId: worksheetRef.sessionId,
        worksheetId: worksheetRef.worksheetId,
        address: address as WorkbookRangeAddress
    };
}