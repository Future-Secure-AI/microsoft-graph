import { describe, expect, it } from "vitest";
import type { Border, BorderStyle, BorderWeight } from "../models/Border.ts";
import type { CellHorizontalAlignment, CellUnderline, CellVerticalAlignment } from "../models/Cell.ts";
import type { Color } from "../models/Color.ts";
import type { FontName } from "../models/FontName.ts";
import calculateWorkbook from "../operations/workbook/calculateWorkbook.ts";
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
import createWorkbookAndStartSession from "./createWorkbookAndStartSession.ts";
import insertWorkbookRangeRows from "./insertWorkbookRangeRows.ts";
import safeDeleteWorkbook from "./safeDeleteWorkbook.ts";

const asColor = (c: string) => c as Color;
const asFontName = (n: string) => n as FontName;
const asCellHorizontalAlignment = (h: string) => h as CellHorizontalAlignment;
const asCellVerticalAlignment = (v: string) => v as CellVerticalAlignment;
const asUnderline = (u: string) => u as CellUnderline;
const asBorderStyle = (s: string) => s as BorderStyle;
const asBorderWeight = (w: string) => w as BorderWeight;
const border = (color: string, style: string, weight: string): Border => ({ color: asColor(color), style: asBorderStyle(style), weight: asBorderWeight(weight) });

const values = [
	["A", "B", "C"],
	["D", "E", "F"],
	["G", "H", "I"],
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

describe("insertWorkbookRangeRows", () => {
	it("inserts values", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			await insertWorkbookRangeRows(
				rangeRef,
				values.map((row) => row.map((value) => ({ value }))),
			);
			await calculateWorkbook(rangeRef);
			const result = await getWorkbookWorksheetRange(rangeRef);
			expect(result.values.slice(0, 3)).toEqual(values);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("inserts with formats", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const format = generalCellFormat;
			await insertWorkbookRangeRows(
				rangeRef,
				values.map((row) => row.map((value) => ({ value, format }))),
			);
			await calculateWorkbook(rangeRef);
			const result = await getWorkbookWorksheetRange(rangeRef);
			expect(result.numberFormat.slice(0, 3)).toEqual(values.map((row) => row.map(() => format)));
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("inserts with alignment", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const alignment = { horizontal: asCellHorizontalAlignment("Center"), vertical: asCellVerticalAlignment("Center"), wrapText: true };
			await insertWorkbookRangeRows(
				rangeRef,
				values.map((row) => row.map((value) => ({ value, alignment }))),
			);
			await calculateWorkbook(rangeRef);
			const cellFormat = await getWorkbookRangeFormat(rangeRef);
			expect(cellFormat.horizontalAlignment).toBe("Center");
			expect(cellFormat.verticalAlignment).toBe("Center");
			expect(cellFormat.wrapText).toBe(true);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("inserts with borders", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const borderObj = border("#000000", "Double", "Thick");
			await insertWorkbookRangeRows(
				rangeRef,
				values.map((row) => row.map((value) => ({ value, borders: { edgeBottom: borderObj } }))),
			);
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

	it("inserts with fill", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const fill = { color: asColor("#FF00FF") };
			await insertWorkbookRangeRows(
				rangeRef,
				values.map((row) => row.map((value) => ({ value, fill }))),
			);
			await calculateWorkbook(rangeRef);
			const fillResult = await getWorkbookRangeFill(rangeRef);
			expect(fillResult.color).toBe("#FF00FF");
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("inserts with font", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const font = { name: asFontName("Arial"), size: 14, color: asColor("#123456"), bold: true, italic: true, underline: asUnderline("Single") };
			await insertWorkbookRangeRows(
				rangeRef,
				values.map((row) => row.map((value) => ({ value, font }))),
			);
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

	it("inserts with merges", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const cells = [
				[{ value: "A", merge: { right: 1, down: 1 } }, {}, { value: "B" }],
				[{}, {}, { value: "C" }],
				[{ value: "D" }, { value: "E" }, { value: "F" }],
			];
			await insertWorkbookRangeRows(rangeRef, cells);
			await calculateWorkbook(rangeRef);
			const result = await getWorkbookWorksheetRange(rangeRef);
			expect(result.values[0][0]).toBe("A");
			expect(result.values[0][2]).toBe("B");
			expect(result.values[1][2]).toBe("C");
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("handles empty input without error", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			await insertWorkbookRangeRows(rangeRef, []);
			await calculateWorkbook(rangeRef);
			const result = await getWorkbookWorksheetRange(rangeRef);
			expect(result.values.slice(0, 3)).toEqual([
				["", "", ""],
				["", "", ""],
				["", "", ""],
			]);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("throws on inconsistent row lengths", async () => {
		const { workbook, rangeRef } = await prepareRange();
		try {
			const badRows = [[{ value: "A" }, { value: "B" }], [{ value: "C" }]];
			await expect(() => insertWorkbookRangeRows(rangeRef, badRows)).rejects.toThrow();
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
