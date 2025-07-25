import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import createWorkbookAndStartSession from "../../tasks/createWorkbookAndStartSession.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbookWorksheet from "./createWorkbookWorksheet.ts";
import deleteWorkbookWorksheet from "./deleteWorkbookWorksheet.ts";
import listWorkbookWorksheets from "./listWorkbookWorksheets.ts";

describe("deleteWorkbookWorksheet", () => {
	it("can delete a worksheet from an existing workbook", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);

		try {
			const worksheet = await createWorkbookWorksheet(workbook);

			await deleteWorkbookWorksheet(worksheet);
			await calculateWorkbook(workbook);

			const worksheets = await listWorkbookWorksheets(workbook);

			expect(worksheets.some((ws) => ws.id === worksheet.worksheetId)).toBe(false);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
