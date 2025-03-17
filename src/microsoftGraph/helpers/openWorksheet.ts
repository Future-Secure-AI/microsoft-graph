import type { WorkbookRef } from "../workbooks/WorkbookRef.js";
import type { WorkbookWorksheetId } from "../workbooks/workbookWorksheet/WorkbookWorksheetId.js";
import type { WorkbookWorksheetRef } from "../workbooks/workbookWorksheet/WorkbookWorksheetRef.js";

/** Convenience helper to start a worksheet session */
export default function openWorksheet(workbookRef: WorkbookRef, worksheetId: WorkbookWorksheetId): WorkbookWorksheetRef {
    return {
        ...workbookRef,
        worksheetId: worksheetId
    };
}