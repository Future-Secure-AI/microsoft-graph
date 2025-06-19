/**
 * Refresh a specific pivot table in a worksheet.
 * @module refreshWorkbookWorksheetPivotTable
 * @category Operations
 */

import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookPivotTableRef } from "../../models/WorkbookPivotTable.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Refresh a specific pivot table in a worksheet.
 * @param pivotTableRef Reference to the pivot table.
 * @returns void (no response body)
 * @see https://learn.microsoft.com/en-us/graph/api/workbookpivottable-refresh
 */
export default function refreshWorkbookWorksheetPivotTable(pivotTableRef: WorkbookPivotTableRef): GraphOperation<void> {
	return operation({
		context: pivotTableRef.context,
		method: "POST",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/pivotTables/{pivot-table-id}/refresh", { ...pivotTableRef, pivotTableId: pivotTableRef.pivotTableId }),
		headers: {
			"workbook-session-id": pivotTableRef.sessionId,
		},
		body: null,
		responseTransform: () => undefined,
	});
}
