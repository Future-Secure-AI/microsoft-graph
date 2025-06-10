/**
 * Create a new worksheet in a workbook, optionally with a defined name.
 * @module createWorkbookWorksheet
 * @category Operations
 */

import type { WorkbookWorksheet } from "@microsoft/microsoft-graph-types";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/Workbook.ts";
import type { WorkbookWorksheetId, WorkbookWorksheetName, WorkbookWorksheetRef } from "../../models/WorkbookWorksheet.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { createWorkbookWorksheetRef } from "../../services/workbookWorksheet.ts";

/**
 * Create a new worksheet in a workbook, optionally with a defined name.
 * @param workbookRef Reference to the workbook where the worksheet will be created.
 * @param name (Optional) The name of the new worksheet.
 * @returns The newly created worksheet.
 * @see https://learn.microsoft.com/en-us/graph/api/worksheetcollection-add
 * @remarks While `createWorkbookWorksheet` returns a reference to the worksheet, `getWorkbookWorksheetByName` and `listWorkbookWorksheets` may be unable to see the worksheet for a number of seconds. Calling `calculateWorkbook` can hasten the availability of the new worksheet for these operations.
 */
export default function createWorkbookWorksheet(workbookRef: WorkbookRef, name?: WorkbookWorksheetName): GraphOperation<WorkbookWorksheet & WorkbookWorksheetRef> {
	return operation({
		context: workbookRef.context,
		method: "POST",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/add", workbookRef),
		headers: {
			"workbook-session-id": workbookRef.sessionId,
			"content-type": "application/json",
		},
		body: {
			name,
		},
		responseTransform: (response) => {
			const worksheet = response as WorkbookWorksheet;
			const worksheetRef = createWorkbookWorksheetRef(workbookRef, worksheet.id as WorkbookWorksheetId);

			return {
				...worksheet,
				...worksheetRef,
			};
		},
	});
}
