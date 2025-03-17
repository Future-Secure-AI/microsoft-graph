import type { WorkbookWorksheetId } from "../models/WorkbookWorksheetId.js";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.js";
import type { WorkbookRef } from "../workbooks/WorkbookRef.js";

/** Convenience helper to start a worksheet session */
export default function openWorksheet(workbookRef: WorkbookRef, worksheetId: WorkbookWorksheetId): WorkbookWorksheetRef {
    return {
        ...workbookRef,
        worksheetId: worksheetId
    };
}