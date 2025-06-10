import { describe, expect, it } from "vitest";
import type { WorkbookWorksheetName } from "../../models/WorkbookWorksheet.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createDefaultWorkbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import getWorkbookWorksheetByName from "../../tasks/getWorkbookWorksheetByName.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "./createWorkbookWorksheet.ts";
import updateWorkbookWorksheet from "./updateWorkbookWorksheet.ts";

describe("updateWorkbookWorksheet", () => {
	it("can update the name of an existing worksheet", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);

		try {
			const worksheetRef = createDefaultWorkbookWorksheetRef(workbook);
			const newName = "UpdatedSheet";
			await updateWorkbookWorksheet(worksheetRef, { name: newName });
			await calculateWorkbook(workbook);

			const updatedWorksheet = await getWorkbookWorksheetByName(workbook, newName);
			expect(updatedWorksheet.name).toBe(newName);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});

	it("can update the visibility of an existing worksheet", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);

		try {
			const worksheetName = "Sheet2" as WorkbookWorksheetName;
			const worksheet = await createWorkbookWorksheet(workbook); // Can't hide the single worksheet
			await updateWorkbookWorksheet(worksheet, { visibility: "Hidden" });
			const updatedWorksheet = await getWorkbookWorksheetByName(worksheet, worksheetName);
			expect(updatedWorksheet.visibility).toBe("Hidden");
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});
});
