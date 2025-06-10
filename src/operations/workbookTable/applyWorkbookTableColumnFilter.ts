/**
 * Apply a filter to a workbook table column.
 * @module applyWorkbookTableColumnFilter
 * @category Operations
 */

import type { WorkbookFilterCriteria } from "@microsoft/microsoft-graph-types";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookTableColumnRef } from "../../models/WorkbookTable.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Apply a filter to a workbook table column.
 * @param columnRef Reference to the table column.
 * @param criteria Filter criteria to apply.
 * @remarks If you intend to immediately read the visible range from this table after changing the filter you must perform a `calculateWorksheet` otherwise the changes may not yet have taken effect.
 * @see https://learn.microsoft.com/en-us/graph/api/filter-apply
 */
export default function applyWorkbookTableColumnFilter(columnRef: WorkbookTableColumnRef, criteria: WorkbookFilterCriteria): GraphOperation<void> {
	return operation({
		context: columnRef.context,
		method: "POST",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/tables/{table-id}/columns/{column}/filter/apply", columnRef),
		headers: {
			"workbook-session-id": columnRef.sessionId,
			"content-type": "application/json",
		},
		body: {
			criteria: criteria,
		},
		responseTransform: () => undefined,
	});
}
