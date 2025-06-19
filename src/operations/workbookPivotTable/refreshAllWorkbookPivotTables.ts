/**
 * Refresh all pivot tables in a worksheet.
 * @module refreshAllWorkbookWorksheetPivotTables
 * @category Operations
 */

import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheet.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Refresh all pivot tables in a worksheet.
 * @param worksheetRef Reference to the worksheet.
 * @returns void (no response body)
 * @see https://learn.microsoft.com/en-us/graph/api/workbookpivottable-refreshall
 */
export default function refreshAllWorkbookWorksheetPivotTables(worksheetRef: WorkbookWorksheetRef): GraphOperation<void> {
	return operation({
		context: worksheetRef.context,
		method: "POST",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/pivotTables/refreshAll", worksheetRef),
		headers: {
			"workbook-session-id": worksheetRef.sessionId,
		},
		body: null,
		responseTransform: () => undefined,
	});
}
