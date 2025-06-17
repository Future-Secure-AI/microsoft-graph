import { describe, expect, it } from "vitest";
import calculateWorkbook from "../operations/workbook/calculateWorkbook.ts";
import getWorkbookWorksheetUsedRange from "../operations/workbookWorksheet/getWorkbookWorksheetUsedRange.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath } from "../services/driveItem.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../services/workbookWorksheet.ts";
import createWorkbookAndStartSession from "./createWorkbookAndStartSession.ts";
import safeDeleteWorkbook from "./safeDeleteWorkbook.ts";
import setWorkbookRangeValues from "./setWorkbookRangeValues.ts";

describe("setWorkbookRangeValues", () => {
	it("calls updateWorkbookRange with the correct arguments when values match the range dimensions", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);

		try {
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:C3");
			const values = [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			];
			await setWorkbookRangeValues(rangeRef, values);
			await calculateWorkbook(workbook);

			const visibleView = await getWorkbookWorksheetUsedRange(rangeRef);
			expect(visibleView.values).toEqual(values);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
