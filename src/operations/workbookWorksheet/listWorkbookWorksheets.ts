/**
 * Retrieve a list of worksheets in a workbook.
 * @module listWorkbookWorksheets
 * @category Operations
 */

import type { WorkbookWorksheet } from "@microsoft/microsoft-graph-types";
import ProtocolError from "../../errors/ProtocolError.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/Workbook.ts";
import type { WorkbookWorksheetId, WorkbookWorksheetRef } from "../../models/WorkbookWorksheet.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { createWorkbookWorksheetRef } from "../../services/workbookWorksheet.ts";

/**
 * Retrieve a list of worksheets in a workbook.
 * @param workbookRef Reference to the workbook.
 * @returns Array of worksheets, each including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/worksheet-list
 */
export default function listWorkbookWorksheets(workbookRef: WorkbookRef): GraphOperation<(WorkbookWorksheet & WorkbookWorksheetRef)[]> {
	return operation({
		context: workbookRef.context,
		method: "GET",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets", workbookRef),
		headers: {
			"workbook-session-id": workbookRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
			const worksheets = response as { value: WorkbookWorksheet[] };

			return worksheets.value.map((worksheet) => {
				const worksheetRef = createWorkbookWorksheetRef(workbookRef, worksheet.id as WorkbookWorksheetId);

				if (!worksheet.name) {
					throw new ProtocolError("Item.name is undefined");
				}

				return {
					...worksheet,
					...worksheetRef,
				};
			});
		},
	});
}
