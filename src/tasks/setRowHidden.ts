import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";

export default async function setRowHidden(rangeRef: WorkbookRangeRef, hidden: boolean): Promise<void> {
	await updateWorkbookRange(rangeRef, {
		rowHidden: hidden,
	});
}
