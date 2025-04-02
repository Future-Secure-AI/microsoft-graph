import type { WorkbookFilterCriteria } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookTableColumnRef } from "../../models/WorkbookTableColumnRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Apply a filter to a workbook table column.
 *
 * @param columnRef - A reference to the table column.
 * @param criteria - The filter criteria to apply.
 * @see https://learn.microsoft.com/en-us/graph/api/filter-apply
 */
export default function applyWorkbookTableColumnFilter(columnRef: WorkbookTableColumnRef, criteria: WorkbookFilterCriteria): GraphOperation<void> {
	return operation({
		contextId: columnRef.contextId,
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
