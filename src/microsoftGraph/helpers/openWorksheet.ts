import type { WorkbookRef } from "../models/WorkbookRef.js";
import type { WorkbookWorksheetId } from "../models/WorkbookWorksheetId.js";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.js";

/** Convenience helper to start a worksheet session */
export default function openWorksheet(workbookRef: WorkbookRef, worksheetId: WorkbookWorksheetId): WorkbookWorksheetRef {
    return {
        ...workbookRef,
        worksheetId: worksheetId
    };
}