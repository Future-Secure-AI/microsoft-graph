import { describe, expect, it } from "vitest";
import type { WorkbookWorksheetName } from "../models/WorkbookWorksheet";
import { getDefaultDriveRef } from "../services/drive";
import { driveItemPath } from "../services/driveItem";
import { generateTempFileName } from "../services/temporaryFiles";
import { defaultWorkbookWorksheetName } from "../services/workbookWorksheet";
import createWorkbookAndStartSession from "./createWorkbookAndStartSession";
import safeDeleteWorkbook from "./safeDeleteWorkbook";
import tryGetWorkbookWorksheetByName from "./tryGetWorkbookWorksheetByName";

describe("tryGetWorkbookWorksheetByName", () => {
	it("returns the worksheet when it exists", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		try {
			const found = await tryGetWorkbookWorksheetByName(workbook, defaultWorkbookWorksheetName);
			expect(found).toHaveProperty("name", defaultWorkbookWorksheetName);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("returns null when worksheet does not exist", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		try {
			const found = await tryGetWorkbookWorksheetByName(workbook, "DefinitelyDoesNotExist" as WorkbookWorksheetName);
			expect(found).toBeNull();
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
