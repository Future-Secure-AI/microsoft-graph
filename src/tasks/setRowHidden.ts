import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";

/** Hide or show one or more rows. */
export default async function setRowHidden(rangeRef: WorkbookRangeRef, hidden: boolean): Promise<WorkbookRange & WorkbookRangeRef> {
	return await updateWorkbookRange(rangeRef, {
		rowHidden: hidden,
	});
}
