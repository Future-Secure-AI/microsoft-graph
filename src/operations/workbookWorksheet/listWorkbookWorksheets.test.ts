import { describe, expect, it } from "vitest";
import { sequential } from "../../graphApi.ts";
import type { WorkbookWorksheetId } from "../../models/WorkbookWorksheetId.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "./createWorkbookWorksheet.ts";
import listWorkbookWorksheets from "./listWorkbookWorksheets.ts";

describe("listWorkbookWorksheets", () => {
	it("can list worksheets in an existing workbook", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);

		try {
			const worksheet1 = await createWorkbookWorksheet(workbook);
			const worksheet2 = await createWorkbookWorksheet(workbook);
			await calculateWorkbook(workbook);

			const worksheets = await listWorkbookWorksheets(workbook);
			const worksheetIds = worksheets.map((ws) => ws.worksheetId) as WorkbookWorksheetId[];

			expect(worksheetIds).toContain(worksheet1.worksheetId);
			expect(worksheetIds).toContain(worksheet2.worksheetId);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});

	it("can list worksheets in an existing workbook parallel", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);

		try {
			const [worksheet1, worksheet2, _, worksheets] = await sequential(createWorkbookWorksheet(workbook), createWorkbookWorksheet(workbook), calculateWorkbook(workbook), listWorkbookWorksheets(workbook));

			const worksheetIds = worksheets.map((worksheet) => worksheet.worksheetId);

			expect(worksheetIds).toContain(worksheet1.worksheetId);
			expect(worksheetIds).toContain(worksheet2.worksheetId);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});
});
