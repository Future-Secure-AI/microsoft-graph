import type { WorkbookWorksheetRangeRef } from "../models/WorkbookWorksheetRangeRef.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";

export default async function setRowHidden(rangeRef: WorkbookWorksheetRangeRef, hidden: boolean): Promise<void> {
    await updateWorkbookRange(rangeRef, {
        rowHidden: hidden
    });
};