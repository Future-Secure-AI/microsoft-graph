/**
 * Converts the table into a normal range of cells. All data is preserved.
 * @module deleteWorkbookTablePreservingValues
 * @category Operations
 */

import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookTableRef } from "../../models/WorkbookTableRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Converts the table into a normal range of cells. All data is preserved.
 * @param tableRef Reference to the table.
 * @see https://learn.microsoft.com/en-us/graph/api/table-converttorange
 */
export default function deleteWorkbookTablePreservingValues(tableRef: WorkbookTableRef): GraphOperation<void> {
	return operation({
		context: tableRef.context,
		method: "POST",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/tables/{table-id}/convertToRange", tableRef),
		headers: {
			"workbook-session-id": tableRef.sessionId,
		},
		body: null,
		responseTransform: () => undefined,
	});
}
