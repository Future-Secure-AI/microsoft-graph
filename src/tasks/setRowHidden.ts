import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";

/** Hide or show one or more rows. */
export default async function setRowHidden(rangeRef: WorkbookRangeRef, hidden: boolean): Promise<void> {
	await updateWorkbookRange(rangeRef, {
		rowHidden: hidden,
	});
}
