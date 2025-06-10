/**
 * Retrieve a list of rows in a table.
 * @module listWorkbookTableRows
 * @category Operations
 */

import type { WorkbookTableRow } from "@microsoft/microsoft-graph-types";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookTableRef } from "../../models/WorkbookTable.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Retrieve a list of rows in a table.
 * @param tableRef Reference to the table.
 * @returns Array of rows in the specified table.
 * @see https://learn.microsoft.com/en-us/graph/api/tablerow-list
 */
export default function listWorkbookTableRows(tableRef: WorkbookTableRef): GraphOperation<WorkbookTableRow[]> {
	return operation({
		context: tableRef.context,
		method: "GET",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/tables/{table-id}/rows", tableRef),
		headers: {
			"workbook-session-id": tableRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
			const list = response as { value: WorkbookTableRow[] };
			return list.value;
		},
	});
}
