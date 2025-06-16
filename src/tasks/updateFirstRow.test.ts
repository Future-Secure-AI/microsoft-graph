import { describe, expect, it } from "vitest";
import calculateWorkbook from "../operations/workbook/calculateWorkbook.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import { accountingCellFormat } from "../services/cell.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath } from "../services/driveItem.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../services/workbookWorksheet.ts";
import tryDeleteDriveItem from "./tryDeleteDriveItem.ts";
import updateFirstRow from "./updateFirstRow.ts";

const values = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];

async function prepareRange() {
	const workbookName = generateTempFileName("xlsx");
	const workbookPath = driveItemPath(workbookName);
	const driveRef = getDefaultDriveRef();
	const workbook = await createWorkbook(driveRef, workbookPath);
	const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
	const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:C3");
	return { workbook, rangeRef };
}

describe("updateFirstRow", () => {
	it("writes values to the first row", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			await updateFirstRow(rangeRef, [{ value: "A" }, { value: "B" }, { value: "C" }]);
			await calculateWorkbook(rangeRef);
			const result = await getWorkbookWorksheetRange(rangeRef);
			expect(result.values[0]).toEqual(["A", "B", "C"]);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});

	it("writes formats to the first row", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			await updateFirstRow(rangeRef, [
				{ value: 1, format: accountingCellFormat },
				{ value: 2, format: accountingCellFormat },
				{ value: 3, format: accountingCellFormat },
			]);
			await calculateWorkbook(rangeRef);
			const result = await getWorkbookWorksheetRange(rangeRef);
			expect(result.numberFormat[0]).toEqual([accountingCellFormat, accountingCellFormat, accountingCellFormat]);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});

	it("leaves other rows unchanged when only first row is updated", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			// Fill all rows first
			const initial = values.map((row) => row.map((value) => ({ value })));
			await import("./updateRows.ts").then(({ default: updateRows }) => updateRows(rangeRef, initial));
			await calculateWorkbook(rangeRef);
			// Update only the first row
			await updateFirstRow(rangeRef, [{ value: 10 }, { value: 20 }, { value: 30 }]);
			await calculateWorkbook(rangeRef);
			const result = await getWorkbookWorksheetRange(rangeRef);
			expect(result.values[0]).toEqual([10, 20, 30]);
			expect(result.values[1]).toEqual([4, 5, 6]);
			expect(result.values[2]).toEqual([7, 8, 9]);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});
});
