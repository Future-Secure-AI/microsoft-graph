import type { WorkbookRef } from "./WorkbookRef.ts";
import type { WorkbookWorksheetId } from "./WorkbookWorksheetId.ts";

export type WorkbookWorksheetRef = WorkbookRef & {
    worksheetId: WorkbookWorksheetId;
};
