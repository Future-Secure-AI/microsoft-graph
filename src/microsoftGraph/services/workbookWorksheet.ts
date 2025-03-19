
import type { WorkbookRef } from "../models/WorkbookRef.js";
import type { WorkbookWorksheetId } from "../models/WorkbookWorksheetId.js";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.js";

export function workbookWorksheetRef(workbookRef: WorkbookRef, worksheetId: WorkbookWorksheetId | undefined): WorkbookWorksheetRef {
    if (!worksheetId) {
        throw new Error("WorksheetID is missing");
    }

    return {
        ...workbookRef,
        worksheetId
    };
}