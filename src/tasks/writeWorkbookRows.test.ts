import { describe, expect, it } from "vitest";
import calculateWorkbook from "../operations/workbook/calculateWorkbook.ts";
import { generalCellFormat } from "../services/cell.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath } from "../services/driveItem.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../services/workbookWorksheet.ts";
import createWorkbookAndStartSession from "./createWorkbookAndStartSession.ts";
import readWorkbookRows from "./readWorkbookRows.ts";
import safeDeleteWorkbook from "./safeDeleteWorkbook.ts";
import writeWorkbookRows from "./writeWorkbookRows.ts";

describe("writeWorkbookRows", () => {
	it("writes rows to a workbook and reads them back", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);

		try {
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1");
			const rows = [
				[
					{ value: 1, text: "1", numberFormat: generalCellFormat },
					{ value: 2, text: "2", numberFormat: generalCellFormat },
					{ value: 3, text: "3", numberFormat: generalCellFormat },
				],
				[
					{ value: 4, text: "4", numberFormat: generalCellFormat },
					{ value: 5, text: "5", numberFormat: generalCellFormat },
					{ value: 6, text: "6", numberFormat: generalCellFormat },
				],
				[
					{ value: 7, text: "7", numberFormat: generalCellFormat },
					{ value: 8, text: "8", numberFormat: generalCellFormat },
					{ value: 9, text: "9", numberFormat: generalCellFormat },
				],
			];

			const count = await writeWorkbookRows(rangeRef, rows);
			expect(count).toBe(rows.length);
			await calculateWorkbook(workbook);

			const readRangeRef = createWorkbookRangeRef(worksheetRef, "A1:C3");
			let idx = 0;
			for await (const row of readWorkbookRows(readRangeRef)) {
				expect(row.map((x) => x.value)).toEqual(rows[idx].map((c) => c.value));
				expect(row.map((x) => x.text)).toEqual(rows[idx].map((c) => c.text));
				expect(row.map((x) => x.format)).toEqual(rows[idx].map((c) => c.numberFormat));
				idx++;
			}
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("writes more rows than the batch size (batching)", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);

		try {
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1");
			const rows = Array.from({ length: 20 }, (_, i) => [
				{ value: i, text: i.toString(), numberFormat: generalCellFormat },
				{ value: i + 1, text: (i + 1).toString(), numberFormat: generalCellFormat },
				{ value: i + 2, text: (i + 2).toString(), numberFormat: generalCellFormat },
			]);

			await writeWorkbookRows(rangeRef, rows, 5); // Force small batch size
			await calculateWorkbook(workbook);

			const readRangeRef = createWorkbookRangeRef(worksheetRef, "A1:C20");
			let idx = 0;
			for await (const row of readWorkbookRows(readRangeRef)) {
				expect(row.map((x) => x.value)).toEqual(rows[idx].map((c) => c.value));
				expect(row.map((x) => x.text)).toEqual(rows[idx].map((c) => c.text));
				expect(row.map((x) => x.format)).toEqual(rows[idx].map((c) => c.numberFormat));
				idx++;
			}
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("writes rows to a workbook from an iterator and reads them back", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);

		function* rowGenerator() {
			yield [
				{ value: 10, text: "10", numberFormat: generalCellFormat },
				{ value: 20, text: "20", numberFormat: generalCellFormat },
				{ value: 30, text: "30", numberFormat: generalCellFormat },
			];
			yield [
				{ value: 40, text: "40", numberFormat: generalCellFormat },
				{ value: 50, text: "50", numberFormat: generalCellFormat },
				{ value: 60, text: "60", numberFormat: generalCellFormat },
			];
			yield [
				{ value: 70, text: "70", numberFormat: generalCellFormat },
				{ value: 80, text: "80", numberFormat: generalCellFormat },
				{ value: 90, text: "90", numberFormat: generalCellFormat },
			];
		}

		try {
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:C3");
			const rows = Array.from(rowGenerator());
			const count = await writeWorkbookRows(rangeRef, rowGenerator());
			expect(count).toBe(rows.length);
			await calculateWorkbook(workbook);

			let idx = 0;
			for await (const row of readWorkbookRows(rangeRef)) {
				expect(row.map((x) => x.value)).toEqual(rows[idx].map((c) => c.value));
				expect(row.map((x) => x.text)).toEqual(rows[idx].map((c) => c.text));
				expect(row.map((x) => x.format)).toEqual(rows[idx].map((c) => c.numberFormat));
				idx++;
			}
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
