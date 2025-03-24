import type { WorkbookWorksheetRangeRef } from "../models/WorkbookWorksheetRangeRef.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";

export default async function setColumnHidden(rangeRef: WorkbookWorksheetRangeRef, hidden: boolean): Promise<void> {
    await updateWorkbookRange(rangeRef, {
        columnHidden: hidden
    });
};