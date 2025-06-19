/**
 * Retrieve a workbook pivot table.
 * @module getWorkbookPivotTable
 * @category Operations
 */

import type { WorkbookPivotTable } from "@microsoft/microsoft-graph-types";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookPivotTableRef } from "../../models/WorkbookPivotTable.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Retrieve a workbook pivot table.
 * @param pivotTableRef Reference to the pivot table.
 * @returns The specified pivot table.
 * @see https://learn.microsoft.com/en-us/graph/api/workbookpivottable-get
 */
export default function getWorkbookPivotTable(pivotTableRef: WorkbookPivotTableRef): GraphOperation<WorkbookPivotTable & WorkbookPivotTableRef> {
	return operation({
		context: pivotTableRef.context,
		method: "GET",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/pivotTables/{pivot-table-id}", pivotTableRef),
		headers: {
			"workbook-session-id": pivotTableRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
			const pivotTable = response as WorkbookPivotTable;
			return {
				...pivotTable,
				...pivotTableRef,
			};
		},
	});
}
