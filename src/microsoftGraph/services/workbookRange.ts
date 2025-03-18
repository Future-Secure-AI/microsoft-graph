import type { WorkbookRangeAddress } from "../models/WorkbookRangeAddress.js";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.js";
import type { WorkbookRef } from "../models/WorkbookRef.js";
import type { WorkbookWorksheetId } from "../models/WorkbookWorksheetId.js";

export function workbookRangeRef(workbookRef: WorkbookRef, worksheetId: WorkbookWorksheetId | undefined, address: WorkbookRangeAddress): WorkbookRangeRef {
    if (!worksheetId) {
        throw new Error("Worksheet ID is missing");
    }

    return {
        ...workbookRef,
        worksheetId,
        address
    };
}