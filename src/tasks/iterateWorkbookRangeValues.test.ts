import { describe, expect, it } from "vitest";
import calculateWorkbook from "../operations/workbook/calculateWorkbook.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath } from "../services/driveItem.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../services/workbookWorksheet.ts";
import createWorkbookAndStartSession from "./createWorkbookAndStartSession.ts";
import iterateWorkbookRangeValues from "./iterateWorkbookRangeValues.ts";
import safeDeleteWorkbook from "./safeDeleteWorkbook.ts";
import setWorkbookRangeValues from "./setWorkbookRangeValues.ts";

describe("iterateWorkbookRangeValues", () => {
	it("Single request", async () => {
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

			let idx = 0;
			for await (const row of iterateWorkbookRangeValues(rangeRef)) {
				expect(row).toEqual(values[idx++]);
			}
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("Multiple requests", async () => {
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

			let idx = 0;
			for await (const row of iterateWorkbookRangeValues(rangeRef, 1)) {
				expect(row).toEqual(values[idx++]);
			}
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
