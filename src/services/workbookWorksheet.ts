/**
 * Utilities for creating and working with workbook worksheet references.
 * @module workbookWorksheet
 * @category Services
 */

import type { WorkbookRef } from "../models/Workbook.ts";
import type { WorkbookWorksheetId, WorkbookWorksheetName, WorkbookWorksheetRef } from "../models/WorkbookWorksheet.ts";

/**
 * ID of the initial worksheet that is included in a new XLSX workbook.
 * @remarks This does not work apply to XLSB workbooks.
 */
export const defaultWorkbookWorksheetId = "{00000000-0001-0000-0000-000000000000}" as WorkbookWorksheetId; // Program Manager in Microsoft Office Extensibility team says this ID is used for the first sheet of all workbooks by design, but not documented. https://github.com/OfficeDev/office-js/issues/552#issuecomment-800841930

/**
 * Name of the initial worksheet that is included in a new workbook.
 */
export const defaultWorkbookWorksheetName = "Sheet1" as WorkbookWorksheetName;

/**
 * Creates a reference to a workbook worksheet.
 * @param workbookRef - The reference to the workbook.
 * @param worksheetId - The ID of the worksheet.
 * @returns A reference to the workbook worksheet.
 * @throws Error if the worksheet ID is missing.
 */
export function createWorkbookWorksheetRef(workbookRef: WorkbookRef, worksheetId: WorkbookWorksheetId | undefined): WorkbookWorksheetRef {
	if (!worksheetId) {
		throw new Error("WorksheetID is missing");
	}

	return {
		context: workbookRef.context,
		siteId: workbookRef.siteId,
		driveId: workbookRef.driveId,
		itemId: workbookRef.itemId,
		sessionId: workbookRef.sessionId,
		worksheetId,
	};
}

/**
 * Creates a reference to the default workbook worksheet that is initially included in all new XLSX workbooks.
 * @param workbookRef - The reference to the workbook.
 * @returns A reference to the default workbook worksheet.
 * @remarks This does not work with XLSB workbooks.
 */
export function createDefaultWorkbookWorksheetRef(workbookRef: WorkbookRef): WorkbookWorksheetRef {
	return createWorkbookWorksheetRef(workbookRef, defaultWorkbookWorksheetId);
}
