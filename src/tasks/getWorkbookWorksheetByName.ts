import type { WorkbookWorksheet } from "@microsoft/microsoft-graph-types";
import NotFoundError from "../errors/NotFoundError.ts";
import type { WorkbookRef } from "../models/WorkbookRef.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";
import listWorkbookWorksheets from "../operations/workbookWorksheet/listWorkbookWorksheets.ts";

/**
 * Get a worksheet by its name. Throws an error if not found.
 *
 * @param workbookRef - A reference to the workbook containing the worksheet.
 * @param name - The name of the worksheet to retrieve.
 * @throws {NotFoundError} If the worksheet with the specified name is not found.
 * @returns The worksheet details.
 */
export default async function getWorkbookWorksheetByName(workbookRef: WorkbookRef, name: string): Promise<WorkbookWorksheet & WorkbookWorksheetRef> {
	// TODO: More performant to get it by a direct call without listing all workbooks?
	const worksheets = await listWorkbookWorksheets(workbookRef);
	const worksheet = worksheets.find((worksheetRef) => worksheetRef.name === name);

	if (!worksheet) {
		throw new NotFoundError(`Worksheet '${name}' not found.`);
	}

	return worksheet;
}
