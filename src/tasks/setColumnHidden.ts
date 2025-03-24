import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";

export default async function setColumnHidden(rangeRef: WorkbookRangeRef, hidden: boolean): Promise<void> {
    await updateWorkbookRange(rangeRef, {
        columnHidden: hidden
    });
};