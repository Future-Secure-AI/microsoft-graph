/**
 * Delete a workbook table. All data in the table will be cleared.
 * @module deleteWorkbookTable
 * @category Operations
 */

import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookTableRef } from "../../models/WorkbookTable.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Delete a workbook table. All data in the table will be cleared.
 * @param tableRef Reference to the table.
 * @see https://learn.microsoft.com/en-us/graph/api/table-delete
 */
export default function deleteWorkbookTable(tableRef: WorkbookTableRef): GraphOperation<void> {
	return operation({
		context: tableRef.context,
		method: "DELETE",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/tables/{table-id}", tableRef),
		headers: {
			"workbook-session-id": tableRef.sessionId,
		},
		body: null,
		responseTransform: () => undefined,
	});
}
