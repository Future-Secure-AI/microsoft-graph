/**
 * Attempts to retrieve a worksheet by its name, returning null if not found.
 * @module tryGetWorkbookWorksheetByName
 * @category Tasks
 */
import type { WorkbookWorksheet } from "@microsoft/microsoft-graph-types";
import type { WorkbookRef } from "../models/Workbook.ts";
import type { WorkbookWorksheetName, WorkbookWorksheetRef } from "../models/WorkbookWorksheet.ts";
import getWorkbookWorksheetByName from "../operations/workbookWorksheet/getWorkbookWorksheetByName.ts";
import { isErrorWithName } from "../services/error.ts";

/**
 * Attempts to retrieve a worksheet by its name.
 * Returns null if the worksheet does not exist (NotFoundError).
 * @param workbookRef Reference to the workbook containing the worksheet.
 * @param name The name of the worksheet to retrieve.
 * @returns The worksheet, or null if not found.
 */
export default async function tryGetWorkbookWorksheetByName(workbookRef: WorkbookRef, name: WorkbookWorksheetName): Promise<(WorkbookWorksheet & WorkbookWorksheetRef) | null> {
	try {
		return await getWorkbookWorksheetByName(workbookRef, name);
	} catch (error) {
		if (isErrorWithName(error, "NotFoundError")) {
			return null;
		}
		throw error;
	}
}
