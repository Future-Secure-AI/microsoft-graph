import { describe, expect, it } from "vitest";
import calculateWorkbook from "../operations/workbook/calculateWorkbook.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath } from "../services/driveItem.ts";
import { generalNumberFormat } from "../services/cellFormat.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../services/workbookWorksheet.ts";
import readWorkbookRows from "./readWorkbookRows.ts";
import setWorkbookRangeValues from "./setWorkbookRangeValues.ts";
import tryDeleteDriveItem from "./tryDeleteDriveItem.ts";

describe("readWorkbookRows", () => {
	it("Single request", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
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
			for await (const row of readWorkbookRows(rangeRef)) {
				expect(row.map((x) => x.value)).toEqual(values[idx]);
				expect(row.map((x) => x.text)).toEqual(values[idx].map((x) => x.toString()));
				expect(row.map((x) => x.format)).toEqual(values[idx].map(() => generalNumberFormat));
				idx++;
			}
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});

	it("Multiple requests", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
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
			for await (const row of readWorkbookRows(rangeRef)) {
				expect(row.map((x) => x.value)).toEqual(values[idx]);
				expect(row.map((x) => x.text)).toEqual(values[idx].map((x) => x.toString()));
				expect(row.map((x) => x.format)).toEqual(values[idx].map(() => generalNumberFormat));
				idx++;
			}
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});
});
