import type { WorkbookRef } from "../models/WorkbookRef.js";
import type { WorkbookWorksheetId } from "../models/WorkbookWorksheetId.js";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.js";

export default function getWorksheetRef(workbookRef: WorkbookRef, worksheetId: WorkbookWorksheetId): WorkbookWorksheetRef {
    return {
        ...workbookRef,
        worksheetId: worksheetId
    };
}