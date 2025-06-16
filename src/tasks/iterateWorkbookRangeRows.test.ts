import { describe, expect, it } from "vitest";
import type { BorderStyle, BorderWeight } from "../models/Border.ts";
import type { Color } from "../models/Color.ts";
import type { FontName } from "../models/FontName.ts";
import calculateWorkbook from "../operations/workbook/calculateWorkbook.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import setWorkbookRangeBorder from "../operations/workbookRange/setWorkbookRangeBorder.ts";
import setWorkbookRangeFill from "../operations/workbookRange/setWorkbookRangeFill.ts";
import setWorkbookRangeFont from "../operations/workbookRange/setWorkbookRangeFont.ts";
import setWorkbookRangeFormat from "../operations/workbookRange/setWorkbookRangeFormat.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import { generalCellFormat } from "../services/cell.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath } from "../services/driveItem.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../services/workbookWorksheet.ts";
import { iterateWorkbookRangeRows } from "./iterateWorkbookRangeRows.ts";
import tryDeleteDriveItem from "./tryDeleteDriveItem.ts";

const values = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];
const texts = values.map((row) => row.map((x) => x.toString()));

async function prepareRange() {
	const workbookName = generateTempFileName("xlsx");
	const workbookPath = driveItemPath(workbookName);
	const driveRef = getDefaultDriveRef();
	const workbook = await createWorkbook(driveRef, workbookPath);
	const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
	const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:C3");
	await updateWorkbookRange(rangeRef, { values: values });
	await calculateWorkbook(rangeRef);
	return rangeRef;
}

describe("iterateWorkbookRangeRows", () => {
	it("Single request", async () => {
		const rangeRef = await prepareRange();

		try {
			let y = 0;
			for await (const { cells, offset, isFirst, isLast } of iterateWorkbookRangeRows(rangeRef)) {
				cells.forEach((cell, x) => {
					expect(cell.value).toEqual(values[y][x]);
					expect(cell.text).toEqual(texts[y][x]);
					expect(cell.format).toEqual(generalCellFormat);
					expect(cell.merge).toEqual({});
					expect(cell.alignment).toEqual({});
					expect(cell.borders).toEqual({});
					expect(cell.fill).toEqual({});
					expect(cell.font).toEqual({});
				});
				expect(offset).toBe(y);
				expect(isFirst).toBe(y === 0);
				expect(isLast).toBe(y === values.length - 1);
				y++;
			}
		} finally {
			await tryDeleteDriveItem(rangeRef);
		}
	});

	it("Multiple requests", async () => {
		const rangeRef = await prepareRange();
		try {
			let y = 0;
			for await (const { cells, offset, isFirst, isLast } of iterateWorkbookRangeRows(rangeRef, undefined, values[0].length)) {
				cells.forEach((cell, x) => {
					expect(cell.value).toEqual(values[y][x]);
					expect(cell.text).toEqual(texts[y][x]);
					expect(cell.format).toEqual(generalCellFormat);
					expect(cell.merge).toEqual({});
					expect(cell.alignment).toEqual({});
					expect(cell.borders).toEqual({});
					expect(cell.fill).toEqual({});
					expect(cell.font).toEqual({});
				});
				expect(offset).toBe(y);
				expect(isFirst).toBe(y === 0);
				expect(isLast).toBe(y === values.length - 1);
				y++;
			}
		} finally {
			await tryDeleteDriveItem(rangeRef);
		}
	});

	it("retrieves just values when scope.values only is set", async () => {
		const rangeRef = await prepareRange();
		try {
			for await (const { cells, offset: y } of iterateWorkbookRangeRows(rangeRef, { values: true })) {
				cells.forEach((cell, x) => {
					expect(cell.value).toEqual(values[y][x]);
					expect(cell.text).toEqual("");
					expect(cell.format).toEqual("");
					expect(cell.merge).toEqual({});
					expect(cell.alignment).toEqual({});
					expect(cell.borders).toEqual({});
					expect(cell.fill).toEqual({});
					expect(cell.font).toEqual({});
				});
			}
		} finally {
			await tryDeleteDriveItem(rangeRef);
		}
	});

	const defaultBorder = {
		color: "#000000" as Color,
		style: "None" as BorderStyle,
		weight: "Thin" as BorderWeight,
	};

	const alternateBorder = {
		color: "#555555" as Color,
		style: "Double" as BorderStyle,
		weight: "Thick" as BorderWeight,
	};

	it("retrieves everything including styles when scope.style is true", { timeout: 30000 }, async () => {
		const rangeRef = await prepareRange();

		const horizontalAlignment = "Center";
		const verticalAlignment = "Center";
		const wrapText = true;
		await setWorkbookRangeFormat(rangeRef, {
			horizontalAlignment: horizontalAlignment,
			verticalAlignment: verticalAlignment,
			wrapText: wrapText,
		});

		const fillColor = "#FF0000" as Color;
		await setWorkbookRangeFill(rangeRef, { color: fillColor });

		const fontName = "Arial" as FontName;
		const fontSize = 12;
		const fontColor = "#000000" as Color;
		const fontItalic = true;
		const fontUnderline = "Single";
		const fontBold = true;
		await setWorkbookRangeFont(rangeRef, {
			name: fontName,
			size: fontSize,
			color: fontColor,
			italic: fontItalic,
			underline: fontUnderline,
			bold: fontBold,
		});

		await setWorkbookRangeBorder(rangeRef, "EdgeBottom", alternateBorder);

		try {
			for await (const { cells, offset, isLast } of iterateWorkbookRangeRows(rangeRef, { alignment: true, borders: true, fill: true, font: true })) {
				cells.forEach((cell, _) => {
					expect(cell.value).toEqual("");
					expect(cell.text).toEqual("");
					expect(cell.format).toEqual("");

					expect(cell.merge).toEqual({});
					expect(cell.alignment).toEqual({
						horizontal: horizontalAlignment,
						vertical: verticalAlignment,
						wrapText: wrapText,
					});
					expect(cell.borders, `offset: ${offset} isLast: ${isLast}`).toEqual({
						edgeLeft: defaultBorder,
						edgeRight: defaultBorder,
						edgeTop: defaultBorder,
						edgeBottom: alternateBorder, // <==
						diagonalDown: defaultBorder,
						diagonalUp: defaultBorder,
						insideHorizontal: defaultBorder,
						insideVertical: defaultBorder,
					});
					expect(cell.fill).toEqual({
						color: fillColor,
					});
					expect(cell.font).toEqual({
						name: fontName,
						size: fontSize,
						color: fontColor,
						italic: fontItalic,
						underline: fontUnderline,
						bold: fontBold,
					});
				});
			}
		} finally {
			await tryDeleteDriveItem(rangeRef);
		}
	});
});
