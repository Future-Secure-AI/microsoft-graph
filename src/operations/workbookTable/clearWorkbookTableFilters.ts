/**
 * Clear all filters from a workbook table.
 * @module clearWorkbookTableColumnFilters
 * @category Operations
 */

import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookTableRef } from "../../models/WorkbookTableRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Clear all filters from a workbook table.
 * @param tableRef Reference to the table.
 * @see https://learn.microsoft.com/en-us/graph/api/table-clearfilters
 */
export default function clearWorkbookTableColumnFilters(tableRef: WorkbookTableRef): GraphOperation<void> {
	return operation({
		context: tableRef.context,
		method: "POST",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/tables/{table-id}/clearFilters", tableRef),
		headers: {
			"workbook-session-id": tableRef.sessionId,
		},
		body: null,
		responseTransform: () => undefined,
	});
}
