import type { WorkbookWorksheetId } from "../../model/WorkbookWorksheetId.js";
import type { WorkbookRef } from "../WorkbookRef.js";

export type WorkbookWorksheetRef = WorkbookRef & {
    worksheetId: WorkbookWorksheetId;
};
