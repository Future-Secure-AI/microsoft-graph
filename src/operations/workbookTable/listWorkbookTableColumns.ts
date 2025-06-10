/**
 * Retrieve a list of columns in a table.
 * @module listWorkbookTableColumns
 * @category Operations
 */

import type { WorkbookTableColumn } from "@microsoft/microsoft-graph-types";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookTableRef } from "../../models/WorkbookTableRef.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Retrieve a list of columns in a table.
 * @param tableRef Reference to the table.
 * @returns Array of columns in the specified table.
 * @see https://learn.microsoft.com/en-us/graph/api/tablecolumn-list
 */
export default function listWorkbookTableColumns(tableRef: WorkbookTableRef): GraphOperation<WorkbookTableColumn[]> {
	return operation({
		context: tableRef.context,
		method: "GET",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/tables/{table-id}/columns", tableRef),
		headers: {
			"workbook-session-id": tableRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
			const list = response as { value: WorkbookTableColumn[] };
			return list.value;
		},
	});
}
