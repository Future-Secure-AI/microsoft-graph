/**
 * Retrieve a list of tables in a worksheet.
 * @module listWorkbookTables
 * @category Operations
 */

import type { WorkbookTable } from "@microsoft/microsoft-graph-types";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/Workbook.ts";
import type { WorkbookTableId } from "../../models/WorkbookTable.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheet.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { createWorkbookTableRef } from "../../services/workbookTable.ts";

/**
 * Retrieve a list of tables in a worksheet.
 * @param worksheetRef Reference to the worksheet.
 * @returns Array of tables, each including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/worksheet-list-tables
 */
export default function listWorkbookTables(worksheetRef: WorkbookWorksheetRef): GraphOperation<(WorkbookTable & WorkbookRef)[]> {
	return operation({
		context: worksheetRef.context,
		method: "GET",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/tables", worksheetRef),
		headers: {
			"workbook-session-id": worksheetRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
			const list = response as { value: WorkbookTable[] };

			const tables = list.value.map((table) => {
				const tableRef = createWorkbookTableRef(worksheetRef, table.id as WorkbookTableId);

				return {
					...table,
					...tableRef,
				};
			});

			return tables;
		},
	});
}
