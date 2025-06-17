import { describe, expect, it } from "vitest";
import type { WorkbookWorksheetId } from "../../models/WorkbookWorksheet.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { sequential } from "../../services/operationInvoker.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import createWorkbookAndStartSession from "../../tasks/createWorkbookAndStartSession.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbookWorksheet from "./createWorkbookWorksheet.ts";
import listWorkbookWorksheets from "./listWorkbookWorksheets.ts";

describe("listWorkbookWorksheets", () => {
	it("can list worksheets in an existing workbook", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);

		try {
			const worksheet1 = await createWorkbookWorksheet(workbook);
			const worksheet2 = await createWorkbookWorksheet(workbook);
			await calculateWorkbook(workbook);

			const worksheets = await listWorkbookWorksheets(workbook);
			const worksheetIds = worksheets.map((ws) => ws.worksheetId) as WorkbookWorksheetId[];

			expect(worksheetIds).toContain(worksheet1.worksheetId);
			expect(worksheetIds).toContain(worksheet2.worksheetId);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("can list worksheets in an existing workbook parallel", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);

		try {
			const [worksheet1, worksheet2, _, worksheets] = await sequential(createWorkbookWorksheet(workbook), createWorkbookWorksheet(workbook), calculateWorkbook(workbook), listWorkbookWorksheets(workbook));

			const worksheetIds = worksheets.map((worksheet) => worksheet.worksheetId);

			expect(worksheetIds).toContain(worksheet1.worksheetId);
			expect(worksheetIds).toContain(worksheet2.worksheetId);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
