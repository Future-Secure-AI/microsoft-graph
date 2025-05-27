import { describe, expect, it } from "vitest";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import calculateWorkbook from "../operations/workbook/calculateWorkbook.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import { asCellText } from "../services/cellText.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath } from "../services/driveItem.ts";
import { generalNumberFormat } from "../services/numberFormat.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../services/workbookWorksheet.ts";
import readWorkbookRows from "./readWorkbookRows.ts";
import tryDeleteDriveItem from "./tryDeleteDriveItem.ts";
import { writeWorkbookRows } from "./writeWorkbookRows.ts";

describe("writeWorkbookRows", () => {
	it("writes rows to a workbook and reads them back", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);

		try {
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:C3");
			const rows = [
				[
					{ value: 1, text: asCellText("1"), numberFormat: generalNumberFormat },
					{ value: 2, text: asCellText("2"), numberFormat: generalNumberFormat },
					{ value: 3, text: asCellText("3"), numberFormat: generalNumberFormat },
				],
				[
					{ value: 4, text: asCellText("4"), numberFormat: generalNumberFormat },
					{ value: 5, text: asCellText("5"), numberFormat: generalNumberFormat },
					{ value: 6, text: asCellText("6"), numberFormat: generalNumberFormat },
				],
				[
					{ value: 7, text: asCellText("7"), numberFormat: generalNumberFormat },
					{ value: 8, text: asCellText("8"), numberFormat: generalNumberFormat },
					{ value: 9, text: asCellText("9"), numberFormat: generalNumberFormat },
				],
			];

			await writeWorkbookRows(rangeRef, rows);
			await calculateWorkbook(workbook);

			let idx = 0;
			for await (const row of readWorkbookRows(rangeRef)) {
				expect(row.map((x) => x.value)).toEqual(rows[idx].map((c) => c.value));
				expect(row.map((x) => x.text)).toEqual(rows[idx].map((c) => c.text));
				expect(row.map((x) => x.numberFormat)).toEqual(rows[idx].map((c) => c.numberFormat));
				idx++;
			}
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});

	it("writes more rows than the batch size (batching)", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);

		try {
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:C20");
			const rows = Array.from({ length: 20 }, (_, i) => [
				{ value: i, text: asCellText(i.toString()), numberFormat: generalNumberFormat },
				{ value: i + 1, text: asCellText((i + 1).toString()), numberFormat: generalNumberFormat },
				{ value: i + 2, text: asCellText((i + 2).toString()), numberFormat: generalNumberFormat },
			]);

			await writeWorkbookRows(rangeRef, rows, 5); // Force small batch size
			await calculateWorkbook(workbook);

			let idx = 0;
			for await (const row of readWorkbookRows(rangeRef)) {
				expect(row.map((x) => x.value)).toEqual(rows[idx].map((c) => c.value));
				expect(row.map((x) => x.text)).toEqual(rows[idx].map((c) => c.text));
				expect(row.map((x) => x.numberFormat)).toEqual(rows[idx].map((c) => c.numberFormat));
				idx++;
			}
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});
});
