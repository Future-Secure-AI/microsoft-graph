import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";

/**
 * Hide or show one or more rows.
 *
 * @param rangeRef - A reference to the workbook range representing the rows to hide or show.
 * @param hidden - A boolean indicating whether to hide (`true`) or show (`false`) the rows.
 * @returns The updated workbook range.
 */
export default async function setRowHidden(rangeRef: WorkbookRangeRef, hidden: boolean): Promise<WorkbookRange & WorkbookRangeRef> {
	return await updateWorkbookRange(rangeRef, {
		rowHidden: hidden,
	});
}
