/**
 * Retrieve a worksheet by its name from a workbook.
 * @module getWorkbookWorksheetByName
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
 * Retrieve a worksheet by its name from a workbook.
 * @param workbookRef Reference to the workbook.
 * @param worksheetName The name of the worksheet to retrieve.
 * @returns The worksheet object.
 * @see https://learn.microsoft.com/en-us/graph/api/worksheet-get
 */
export default function getWorkbookWorksheetByName(workbookRef: WorkbookRef, worksheetName: WorkbookWorksheetName): GraphOperation<WorkbookWorksheet & WorkbookWorksheetRef> {
	return operation({
		context: workbookRef.context,
		method: "GET",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets('${encodeURIComponent(worksheetName)}')`, workbookRef),
		headers: {
			"workbook-session-id": workbookRef.sessionId,
		},
		body: null,
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
