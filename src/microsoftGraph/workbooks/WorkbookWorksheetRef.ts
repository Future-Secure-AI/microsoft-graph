import type { WorkbookRef } from "./WorkbookRef.js";
import type { WorkbookWorksheetId } from "./WorkbookWorksheetId.js";

export type WorkbookWorksheetRef = WorkbookRef & {
    worksheetId: WorkbookWorksheetId;
};
