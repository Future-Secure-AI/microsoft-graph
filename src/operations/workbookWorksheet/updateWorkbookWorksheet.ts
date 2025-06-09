/**
 * Update the name, position, and/or visibility of a worksheet.
 * @module updateWorkbookWorksheet
 * @category Operations
 */

import type { WorkbookWorksheet } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Update the name, position, and/or visibility of a worksheet.
 * @param worksheetRef Reference to the worksheet to be updated.
 * @param updates - An object containing the properties to update:
 *   - `name` (optional): The new name for the worksheet.
 *   - `position` (optional): The new position of the worksheet in the workbook.
 *   - `visibility` (optional): The visibility state of the worksheet - "Visible", "Hidden", or "VeryHidden".
 * @returns The updated worksheet, including its reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/worksheet-update
 */
export default function updateWorkbookWorksheet(worksheetRef: WorkbookWorksheetRef, updates: { name?: string; position?: number; visibility?: "Visible" | "Hidden" | "VeryHidden" }): GraphOperation<WorkbookWorksheet & WorkbookWorksheetRef> {
	// TODO: Flatten parameters
	return operation({
		context: worksheetRef.context,
		method: "PATCH",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}", worksheetRef),
		headers: {
			"workbook-session-id": worksheetRef.sessionId,
			"content-type": "application/json",
		},
		body: updates,
		responseTransform: (response) => {
			const worksheet = response as WorkbookWorksheet;
			return {
				...worksheet,
				...worksheetRef,
			};
		},
	});
}
