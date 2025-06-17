import { describe, expect, it } from "vitest";
import type { WorkbookWorksheetName } from "../../models/WorkbookWorksheet.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import createWorkbookAndStartSession from "../../tasks/createWorkbookAndStartSession.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import createWorkbookWorksheet from "./createWorkbookWorksheet.ts";

describe("createWorkbookWorksheet", () => {
	it("can create a new worksheet in an existing workbook", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetName = "Sheet2" as WorkbookWorksheetName;

		try {
			const worksheet = await createWorkbookWorksheet(workbook, worksheetName);
			expect(worksheet.name).toBe(worksheetName);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("can create a new worksheet without a name", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);

		try {
			const worksheet = await createWorkbookWorksheet(workbook);
			expect(worksheet.name).toBeDefined();
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
