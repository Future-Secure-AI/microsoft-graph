import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";

/** Hide or show one or more columns. */
export default async function setColumnHidden(rangeRef: WorkbookRangeRef, hidden: boolean): Promise<WorkbookRange & WorkbookRangeRef> {
	return await updateWorkbookRange(rangeRef, {
		columnHidden: hidden,
	});
}
