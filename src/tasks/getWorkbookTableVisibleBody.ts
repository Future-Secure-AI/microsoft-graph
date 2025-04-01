import type { WorkbookRangeView } from "@microsoft/microsoft-graph-types";
import type { WorkbookTableRef } from "../models/WorkbookTableRef.ts";
import getWorkbookVisibleRange from "../operations/workbookRange/getWorkbookVisibleRange.ts";
import getWorkbookTableBodyRange from "../operations/workbookTable/getWorkbookTableBodyRange.ts";

/**
 * Get the visible cells of a workbook table. Hidden cells are omitted.
 *
 * @param tableRef - A reference to the workbook table.
 * @returns The visible range of the table.
 */
export async function getWorkbookTableVisibleBody(tableRef: WorkbookTableRef): Promise<WorkbookRangeView> {
	const range = await getWorkbookTableBodyRange(tableRef);
	const visibleRange = await getWorkbookVisibleRange(range);

	return visibleRange;
}
