import { describe, expect, it } from "vitest";
import type { Border, BorderStyle, BorderWeight } from "../models/Border.ts";
import type { CellHorizontalAlignment, CellUnderline, CellVerticalAlignment } from "../models/Cell.ts";
import type { Color } from "../models/Color.ts";
import type { FontName } from "../models/FontName.ts";
import calculateWorkbook from "../operations/workbook/calculateWorkbook.ts";
import getWorkbookRangeAlignment from "../operations/workbookRange/getWorkbookRangeAlignment.ts";
import getWorkbookRangeFill from "../operations/workbookRange/getWorkbookRangeFill.ts";
import getWorkbookRangeFont from "../operations/workbookRange/getWorkbookRangeFont.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import listWorkbookRangeBorders from "../operations/workbookRange/listWorkbookRangeBorders.ts";
import { accountingCellFormat } from "../services/cell.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath } from "../services/driveItem.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../services/workbookWorksheet.ts";
import createWorkbookAndStartSession from "./createWorkbookAndStartSession.ts";
import safeDeleteWorkbook from "./safeDeleteWorkbook.ts";
import updateWorkbookRangeRows from "./updateWorkbookRangeRows.ts";

const asColor = (c: string) => c as Color;
const asFontName = (n: string) => n as FontName;
const asCellHorizontalAlignment = (h: string) => h as CellHorizontalAlignment;
const asCellVerticalAlignment = (v: string) => v as CellVerticalAlignment;
const asUnderline = (u: string) => u as CellUnderline;
const asBorderStyle = (s: string) => s as BorderStyle;
const asBorderWeight = (w: string) => w as BorderWeight;
const border = (color: string, style: string, weight: string): Border => ({ color: asColor(color), style: asBorderStyle(style), weight: asBorderWeight(weight) });

const values = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];

async function prepareRange() {
	const workbookName = generateTempFileName("xlsx");
	const workbookPath = driveItemPath(workbookName);
	const driveRef = getDefaultDriveRef();
	const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
	const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
	const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:C3");
	return { workbook, rangeRef };
}

describe("updateWorkbookRangeRows", () => {
	it("writes values", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const cells = values.map((row) => row.map((value) => ({ value })));
			await updateWorkbookRangeRows(rangeRef, cells);

			await calculateWorkbook(rangeRef);
			const result = await getWorkbookWorksheetRange(rangeRef);
			expect(result.values).toEqual(values);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("writes formats", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const cells = values.map((row) => row.map((value) => ({ value, format: accountingCellFormat })));
			await updateWorkbookRangeRows(rangeRef, cells);

			await calculateWorkbook(rangeRef);
			const result = await getWorkbookWorksheetRange(rangeRef);
			expect(result.numberFormat).toEqual(values.map((row) => row.map(() => accountingCellFormat)));
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("writes alignment", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const alignment = { horizontal: asCellHorizontalAlignment("Center"), vertical: asCellVerticalAlignment("Center"), wrapText: true };
			const cells = values.map((row) => row.map((value) => ({ value, alignment })));
			await updateWorkbookRangeRows(rangeRef, cells);

			await calculateWorkbook(rangeRef);
			const cellFormat = await getWorkbookRangeAlignment(rangeRef);
			expect(cellFormat.horizontalAlignment).toBe("Center");
			expect(cellFormat.verticalAlignment).toBe("Center");
			expect(cellFormat.wrapText).toBe(true);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("writes borders", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const borderObj = border("#000000", "Double", "Thick");
			const cells = values.map((row) => row.map((value) => ({ value, borders: { edgeBottom: borderObj } })));
			await updateWorkbookRangeRows(rangeRef, cells);

			await calculateWorkbook(rangeRef);
			const borders = await listWorkbookRangeBorders(rangeRef);
			const bottom = borders.find((b) => b.sideIndex === "EdgeBottom");
			expect(bottom?.color).toBe("#000000");
			expect(bottom?.style).toBe("Double");
			expect(bottom?.weight).toBe("Thick");
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("writes fill", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const fill = { color: asColor("#FF00FF") };
			const cells = values.map((row) => row.map((value) => ({ value, fill })));
			await updateWorkbookRangeRows(rangeRef, cells);

			await calculateWorkbook(rangeRef);
			const fillResult = await getWorkbookRangeFill(rangeRef);
			expect(fillResult.color).toBe("#FF00FF");
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("writes font", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const font = { name: asFontName("Arial"), size: 14, color: asColor("#123456"), bold: true, italic: true, underline: asUnderline("Single") };
			const cells = values.map((row) => row.map((value) => ({ value, font })));
			await updateWorkbookRangeRows(rangeRef, cells);

			await calculateWorkbook(rangeRef);
			const fontResult = await getWorkbookRangeFont(rangeRef);
			expect(fontResult.name).toBe("Arial");
			expect(fontResult.size).toBe(14);
			expect(fontResult.color).toBe("#123456");
			expect(fontResult.bold).toBe(true);
			expect(fontResult.italic).toBe(true);
			expect(fontResult.underline).toBe("Single");
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("writes merges", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const cells = [
				[{ value: "A", merge: { right: 1, down: 1 } }, {}, { value: "B" }],
				[{}, {}, { value: "C" }],
				[{ value: "D" }, { value: "E" }, { value: "F" }],
			];
			await updateWorkbookRangeRows(rangeRef, cells);

			await calculateWorkbook(rangeRef);
			const result = await getWorkbookWorksheetRange(rangeRef);
			expect(result.values[0][0]).toBe("A");
			expect(result.values[0][2]).toBe("B");
			expect(result.values[1][2]).toBe("C");
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("leaves cells unchanged when value is undefined", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const cells = values.map((row) => row.map((value) => ({ value })));
			await updateWorkbookRangeRows(rangeRef, cells);

			await calculateWorkbook(rangeRef);
			const partial = values.map((row, y) => row.map((_, x) => (y === 1 && x === 1 ? { value: 42 } : {})));
			await updateWorkbookRangeRows(rangeRef, partial);
			await calculateWorkbook(rangeRef);
			const result = await getWorkbookWorksheetRange(rangeRef);
			const expected = values.map((row, y) => row.map((v, x) => (y === 1 && x === 1 ? 42 : v)));
			expect(result.values).toEqual(expected);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("handles empty input without error", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			await updateWorkbookRangeRows(rangeRef, []);

			await calculateWorkbook(rangeRef);
			const result = await getWorkbookWorksheetRange(rangeRef);
			expect(result.values).toEqual([
				["", "", ""],
				["", "", ""],
				["", "", ""],
			]);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
