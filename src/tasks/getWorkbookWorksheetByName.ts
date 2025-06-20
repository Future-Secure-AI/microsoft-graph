/**
 * Get a worksheet by its name.
 * @module getWorkbookWorksheetByName
 * @category Tasks
 * @hidden
 */

import type { WorkbookWorksheet } from "@microsoft/microsoft-graph-types";
import NotFoundError from "../errors/NotFoundError.ts";
import type { WorkbookRef } from "../models/Workbook.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheet.ts";
import listWorkbookWorksheets from "../operations/workbookWorksheet/listWorkbookWorksheets.ts";

/**
 * Get a worksheet by its name.
 *
 * @param workbookRef A reference to the workbook containing the worksheet.
 * @param name The name of the worksheet to retrieve.
 * @throws {@link NotFoundError} If the worksheet with the specified name is not found.
 * @returns Worksheet
 * @deprecated Use `getWorkbookWorksheetByName` operation instead
 * @hidden
 */
export default async function getWorkbookWorksheetByName(workbookRef: WorkbookRef, name: string): Promise<WorkbookWorksheet & WorkbookWorksheetRef> {
	const worksheets = await listWorkbookWorksheets(workbookRef);
	const worksheet = worksheets.find((worksheetRef) => worksheetRef.name === name);

	if (!worksheet) {
		throw new NotFoundError(`Worksheet '${name}' not found.`);
	}

	return worksheet;
}
