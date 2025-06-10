/**
 * Create a new table in a worksheet.
 * @module createWorkbookTable
 * @category Operations
 */

import type { WorkbookTable } from "@microsoft/microsoft-graph-types";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRange.ts";
import type { WorkbookTableId, WorkbookTableRef } from "../../models/WorkbookTable.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { createWorkbookTableRef } from "../../services/workbookTable.ts";

/**
 * Create a new table in a worksheet.
 * @param rangeRef Reference to the range where the table will be created.
 * @param hasHeaders If the table has headers.
 * @returns The newly created table.
 * @see https://learn.microsoft.com/en-us/graph/api/worksheet-post-tables
 */
export default function createWorkbookTable(rangeRef: WorkbookRangeRef, hasHeaders: boolean): GraphOperation<WorkbookTable & WorkbookTableRef> {
	return operation({
		context: rangeRef.context,
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
