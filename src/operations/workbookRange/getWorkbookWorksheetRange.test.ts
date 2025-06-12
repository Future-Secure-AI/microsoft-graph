import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../../services/workbookWorksheet.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import calculateWorkbook from "./../workbook/calculateWorkbook.ts";
import getWorkbookWorksheetRange from "./getWorkbookWorksheetRange.ts";
import updateWorkbookRange from "./updateWorkbookRange.ts";
const values = [
	[1, 2],
	[3, 4],
];

describe("getWorkbookRange", () => {
	it("can retrieve a range", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");

		try {
			await updateWorkbookRange(rangeRef, {
				values: values,
			});
			await calculateWorkbook(rangeRef);
			const range = await getWorkbookWorksheetRange(rangeRef);

			expect(range.values).toEqual(values);
			expect(range.text).toEqual(values.map((row) => row.map((cell) => cell.toString())));
			expect(range.numberFormat).toEqual(values.map((row) => row.map(() => "General")));
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});

	it("can retrieve a range, with only values", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");

		try {
			await updateWorkbookRange(rangeRef, {
				values: values,
			});

			await calculateWorkbook(rangeRef);
			const range = await getWorkbookWorksheetRange(rangeRef, { values: true });

			expect(range.values).toEqual(values);
			expect(range.text).toBeUndefined();
			expect(range.numberFormat).toBeUndefined();
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});

	it("can retrieve a range, with only text", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");

		try {
			await updateWorkbookRange(rangeRef, {
				values: values,
			});

			await calculateWorkbook(rangeRef);
			const range = await getWorkbookWorksheetRange(rangeRef, { text: true });

			expect(range.values).toBeUndefined();
			expect(range.text).toEqual(values.map((row) => row.map((cell) => cell.toString())));
			expect(range.numberFormat).toBeUndefined();
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});
});
