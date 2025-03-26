import type { WorkbookPivotTable } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookPivotTableRef } from "../../models/WorkbookPivotTableRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Retrieve a pivot table by its Id. @see https://learn.microsoft.com/en-us/graph/api/workbookpivottable-get */
export default function getWorkbookPivotTable(pivotTableRef: WorkbookPivotTableRef): GraphOperation<WorkbookPivotTable & WorkbookPivotTableRef> {
	return operation({
		method: "GET",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/pivotTables/{pivot-table-id}", pivotTableRef),
		headers: {
			"workbook-session-id": pivotTableRef.sessionId,
		},
		body: null,
		responseTransform: response => {
			const pivotTable = response as WorkbookPivotTable;

			return {
				...pivotTable,
				...pivotTableRef
			}
		}
	});
}
