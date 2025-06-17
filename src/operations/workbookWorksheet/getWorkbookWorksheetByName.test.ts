import { describe, expect, it } from "vitest";
import type { WorkbookWorksheetName } from "../../models/WorkbookWorksheet.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import createWorkbookAndStartSession from "../../tasks/createWorkbookAndStartSession.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbookWorksheet from "./createWorkbookWorksheet.ts";
import getWorkbookWorksheetByName from "./getWorkbookWorksheetByName.ts";

describe("getWorkbookWorksheetByName", () => {
	it("can retrieve a worksheet by name from an existing workbook", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetName = "Sheet2" as WorkbookWorksheetName;

		try {
			await createWorkbookWorksheet(workbook, worksheetName);
			await calculateWorkbook(workbook);
			const worksheet = await getWorkbookWorksheetByName(workbook, worksheetName);
			expect(worksheet.name).toBe(worksheetName);
			expect(worksheet.worksheetId).toBeDefined();
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("throws or returns error for non-existent worksheet name", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetName = "NonExistentSheet" as WorkbookWorksheetName;

		try {
			let errorCaught = false;
			try {
				await getWorkbookWorksheetByName(workbook, worksheetName);
			} catch {
				errorCaught = true;
			}
			expect(errorCaught).toBe(true);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
