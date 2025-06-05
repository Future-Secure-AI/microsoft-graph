import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookTableRef } from "../../models/WorkbookTableRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Retrieve the visible data body range of a table.
 *
 * @param tableRef - A reference to the table, optionally including session information.
 * @returns The data body range of the specified table, including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/table-databodyrange
 */
export default function getWorkbookTableBodyVisibleRange(tableRef: WorkbookTableRef): GraphOperation<WorkbookRange> {
	return operation({
		context: tableRef.context,
		method: "GET",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/tables/{table-id}/dataBodyRange/visibleView", tableRef),
		headers: {
			"workbook-session-id": tableRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
			const range = response as WorkbookRange;
			// This API does not appear to return the range address. It is undefined.
			// const rangeRef = createWorkbookRangeRef(tableRef, range.address as CellRangeAddress);

			return range;
		},
	});
}
