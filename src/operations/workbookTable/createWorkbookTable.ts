import type { WorkbookTable } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import type { WorkbookTableId } from "../../models/WorkbookTableId.ts";
import type { WorkbookTableRef } from "../../models/WorkbookTableRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { createWorkbookTableRef } from "../../services/workbookTable.ts";

/**
 * Create a new table in a worksheet.
 *
 * @param rangeRef - A reference to the range where the table will be created, optionally including session information.
 * @param hasHeaders - A boolean indicating whether the table has headers.
 * @returns The newly created table, including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/worksheet-post-tables
 */
export default function createWorkbookTable(rangeRef: WorkbookRangeRef, hasHeaders: boolean): GraphOperation<WorkbookTable & WorkbookTableRef> {
	return operation({
		contextId: rangeRef.contextId,
		method: "POST",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/tables/add", rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
			"content-type": "application/json",
		},
		body: {
			address: rangeRef.address,
			hasHeaders,
		},
		responseTransform: (response) => {
			const table = response as WorkbookTable;
			const tableRef = createWorkbookTableRef(rangeRef, table.id as WorkbookTableId);
			return {
				...table,
				...tableRef,
			};
		},
	});
}
