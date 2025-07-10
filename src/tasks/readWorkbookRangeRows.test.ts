import { describe, expect, it } from "vitest";
import calculateWorkbook from "../operations/workbook/calculateWorkbook.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import { generalCellFormat } from "../services/cell.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath } from "../services/driveItem.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../services/workbookWorksheet.ts";
import createWorkbookAndStartSession from "./createWorkbookAndStartSession.ts";
import readWorkbookRangeRows from "./readWorkbookRangeRows.ts";
import tryDeleteDriveItem from "./tryDeleteDriveItem.ts";

const values = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];
const texts = values.map((row) => row.map((x) => x.toString()));

describe("readWorkbookRangeRows", () => {
	async function prepareRange() {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:C3");
		await updateWorkbookRange(rangeRef, { values: values });
		await calculateWorkbook(rangeRef);
		return rangeRef;
	}

	it("reads all rows with default scope", async () => {
		const rangeRef = await prepareRange();
		try {
			const rows = await readWorkbookRangeRows(rangeRef);
			expect(rows.length).toBe(3);
			rows.forEach((row, y) => {
				expect(row.length).toBe(3);
				row.forEach((cell, x) => {
					expect(cell.value).toEqual(values[y][x]);
					expect(cell.text).toEqual(texts[y][x]);
					expect(cell.format).toEqual(generalCellFormat);
				});
			});
		} finally {
			await tryDeleteDriveItem(rangeRef);
		}
	});

	it("reads all rows with values only scope", async () => {
		const rangeRef = await prepareRange();
		try {
			const rows = await readWorkbookRangeRows(rangeRef, { value: true, text: false, format: false, alignment: false, border: false, fill: false, font: false });
			rows.forEach((row, y) => {
				row.forEach((cell, x) => {
					expect(cell.value).toEqual(values[y][x]);
					expect(cell.text).toEqual("");
					expect(cell.format).toEqual("");
				});
			});
		} finally {
			await tryDeleteDriveItem(rangeRef);
		}
	});
});
