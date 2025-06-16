import { describe, expect, it } from "vitest";
import type { Border, BorderStyle, BorderWeight } from "../models/Border.ts";
import type { CellHorizontalAlignment, CellUnderline, CellVerticalAlignment } from "../models/Cell.ts";
import type { Color } from "../models/Color.ts";
import type { FontName } from "../models/FontName.ts";
import calculateWorkbook from "../operations/workbook/calculateWorkbook.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import getWorkbookRangeFill from "../operations/workbookRange/getWorkbookRangeFill.ts";
import getWorkbookRangeFont from "../operations/workbookRange/getWorkbookRangeFont.ts";
import getWorkbookRangeFormat from "../operations/workbookRange/getWorkbookRangeFormat.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import listWorkbookRangeBorders from "../operations/workbookRange/listWorkbookRangeBorders.ts";
import { generalCellFormat } from "../services/cell.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath } from "../services/driveItem.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../services/workbookWorksheet.ts";
import insertWorkbookRangeRow from "./insertWorkbookRangeRow.ts";
import tryDeleteDriveItem from "./tryDeleteDriveItem.ts";

const asColor = (c: string) => c as Color;
const asFontName = (n: string) => n as FontName;
const asCellHorizontalAlignment = (h: string) => h as CellHorizontalAlignment;
const asCellVerticalAlignment = (v: string) => v as CellVerticalAlignment;
const asUnderline = (u: string) => u as CellUnderline;
const asBorderStyle = (s: string) => s as BorderStyle;
const asBorderWeight = (w: string) => w as BorderWeight;
const border = (color: string, style: string, weight: string): Border => ({ color: asColor(color), style: asBorderStyle(style), weight: asBorderWeight(weight) });

async function prepareRange() {
	const workbookName = generateTempFileName("xlsx");
	const workbookPath = driveItemPath(workbookName);
	const driveRef = getDefaultDriveRef();
	const workbook = await createWorkbook(driveRef, workbookPath);
	const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
	const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:C1");
	return { workbook, rangeRef };
}

describe("insertWorkbookRangeRow", () => {
	it("inserts values", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			await insertWorkbookRangeRow(rangeRef, [{ value: "A" }, { value: "B" }, { value: "C" }]);
			await calculateWorkbook(rangeRef);
			const result = await getWorkbookWorksheetRange(rangeRef);
			expect(result.values[0]).toEqual(["A", "B", "C"]);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});

	it("inserts with formats", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const format = generalCellFormat;
			await insertWorkbookRangeRow(rangeRef, [
				{ value: "A", format },
				{ value: "B", format },
				{ value: "C", format },
			]);
			await calculateWorkbook(rangeRef);
			const result = await getWorkbookWorksheetRange(rangeRef);
			expect(result.numberFormat[0]).toEqual([format, format, format]);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});

	it("inserts with alignment", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const alignment = { horizontal: asCellHorizontalAlignment("Center"), vertical: asCellVerticalAlignment("Center"), wrapText: true };
			await insertWorkbookRangeRow(rangeRef, [
				{ value: "A", alignment },
				{ value: "B", alignment },
				{ value: "C", alignment },
			]);
			await calculateWorkbook(rangeRef);
			const cellFormat = await getWorkbookRangeFormat(rangeRef);
			expect(cellFormat.horizontalAlignment).toBe("Center");
			expect(cellFormat.verticalAlignment).toBe("Center");
			expect(cellFormat.wrapText).toBe(true);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});

	it("inserts with borders", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const borderObj = border("#000000", "Double", "Thick");
			await insertWorkbookRangeRow(rangeRef, [
				{ value: "A", borders: { edgeBottom: borderObj } },
				{ value: "B", borders: { edgeBottom: borderObj } },
				{ value: "C", borders: { edgeBottom: borderObj } },
			]);
			await calculateWorkbook(rangeRef);
			const borders = await listWorkbookRangeBorders(rangeRef);
			const bottom = borders.find((b) => b.sideIndex === "EdgeBottom");
			expect(bottom?.color).toBe("#000000");
			expect(bottom?.style).toBe("Double");
			expect(bottom?.weight).toBe("Thick");
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});

	it("inserts with fill", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const fill = { color: asColor("#FF00FF") };
			await insertWorkbookRangeRow(rangeRef, [
				{ value: "A", fill },
				{ value: "B", fill },
				{ value: "C", fill },
			]);
			await calculateWorkbook(rangeRef);
			const fillResult = await getWorkbookRangeFill(rangeRef);
			expect(fillResult.color).toBe("#FF00FF");
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});

	it("inserts with font", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const font = { name: asFontName("Arial"), size: 14, color: asColor("#123456"), bold: true, italic: true, underline: asUnderline("Single") };
			await insertWorkbookRangeRow(rangeRef, [
				{ value: "A", font },
				{ value: "B", font },
				{ value: "C", font },
			]);
			await calculateWorkbook(rangeRef);
			const fontResult = await getWorkbookRangeFont(rangeRef);
			expect(fontResult.name).toBe("Arial");
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});
});
