/**
 * Permanently delete a worksheet.
 * @module deleteWorkbookWorksheet
 * @category Operations
 */

import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Permanently delete a worksheet.
 * @param worksheetRef Reference to the worksheet to be deleted.
 *  * @see https://learn.microsoft.com/en-us/graph/api/worksheet-delete
 */
export default function deleteWorkbookWorksheet(worksheetRef: WorkbookWorksheetRef): GraphOperation<void> {
	return operation({
		context: worksheetRef.context,
		method: "DELETE",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}", worksheetRef),
		headers: {
			"workbook-session-id": worksheetRef.sessionId,
		},
		body: null,
		responseTransform: () => undefined,
	});
}
