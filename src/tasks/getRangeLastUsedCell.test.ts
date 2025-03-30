import { describe, expect, it } from "vitest";
import { sequential } from "../graphApi.ts";
import calculateWorkbook from "../operations/workbook/calculateWorkbook.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath } from "../services/driveItem.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../services/workbookWorksheet.ts";
import deleteDriveItemWithRetry from "./deleteDriveItemWithRetry.ts";
import getRangeLastUsedCell from "./getRangeLastUsedCell.ts";

describe("getRangeLastUsedCell", () => {
	it("should return the last used cell value", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");

		try {
			await sequential(
				updateWorkbookRange(rangeRef, {
					values: [
						[1, 2],
						[3, 4],
					],
				}),
				calculateWorkbook(workbook),
			);
			const result = await getRangeLastUsedCell(rangeRef);
			if (result === null) {
				throw new Error("Expected a result");
			}
			expect(result.value).toBe(4);
			expect(result.address).toBe("B2");
			expect(result.rowIndex).toBe(1);
			expect(result.columnIndex).toBe(1);
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});

	it("should return the last non-empty cell value when the last cell is empty", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");

		try {
			await sequential(
				updateWorkbookRange(rangeRef, {
					values: [
						[1, 2],
						[3, null],
					],
				}),
				calculateWorkbook(workbook),
			);
			const result = await getRangeLastUsedCell(rangeRef);
			if (result === null) {
				throw new Error("Expected a result");
			}
			expect(result.value).toBe(3);
			expect(result.address).toBe("A2");
			expect(result.rowIndex).toBe(1);
			expect(result.columnIndex).toBe(0);
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});

	it("should return null when no cells are used", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");

		try {
			await sequential(
				updateWorkbookRange(rangeRef, {
					values: [
						[null, null],
						[null, null],
					],
				}),
				calculateWorkbook(workbook),
			);
			const result = await getRangeLastUsedCell(rangeRef);
			expect(result).toBeNull();
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});
});
