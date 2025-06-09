import type { WorkbookWorksheet } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/WorkbookRef.ts";
import type { WorkbookWorksheetId } from "../../models/WorkbookWorksheetId.ts";
import type { WorkbookWorksheetName } from "../../models/WorkbookWorksheetName.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { createWorkbookWorksheetRef } from "../../services/workbookWorksheet.ts";

/**
 * Create a new worksheet in a workbook, optionally with a defined name.
 *
 * @param workbookRef Reference to the workbook where the worksheet will be created, optionally including session information.
 * @param name - (Optional) The name of the new worksheet.
 * @returns The newly created worksheet, including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/worksheetcollection-add
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
