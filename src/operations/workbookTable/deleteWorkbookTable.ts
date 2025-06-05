// https://learn.microsoft.com/en-us/graph/api/table-delete
// DELETE /sites/{site-id}/drives/{drive-id/items/{item-id}/workbook/tables/{table-id}

import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookTableRef } from "../../models/WorkbookTableRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Delete a workbook table. All data in the table will be cleared.
 *
 * @param tableRef - A reference to the table, optionally including session information.
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
