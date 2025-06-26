import { describe, expect, it } from "vitest";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange";
import { getDefaultDriveRef } from "../services/drive";
import { driveItemPath } from "../services/driveItem";
import { generateTempFileName } from "../services/temporaryFiles";
import { createWorkbookRangeRef } from "../services/workbookRange";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../services/workbookWorksheet";
import createWorkbookAndStartSession from "./createWorkbookAndStartSession";
import safeDeleteWorkbook from "./safeDeleteWorkbook";
import tryGetWorkbookWorksheetUsedRangeRef from "./tryGetWorkbookWorksheetUsedRangeRef";

describe("tryGetWorkbookWorksheetUsedRangeRef", () => {
	it("returns the used range for a worksheet with data", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");
		const values = [
			[1, 2],
			[3, 4],
		];
		try {
			await updateWorkbookRange(rangeRef, { values });
			const usedRange = await tryGetWorkbookWorksheetUsedRangeRef(worksheetRef);
			expect(usedRange).not.toBeNull();
			expect(usedRange).toHaveProperty("address");
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("returns null for a blank worksheet", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		try {
			const usedRange = await tryGetWorkbookWorksheetUsedRangeRef(worksheetRef);
			expect(usedRange).toBeNull();
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
