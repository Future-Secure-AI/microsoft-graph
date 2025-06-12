import { describe, expect, it } from "vitest";
import type { CellStyle } from "../models/Cell.ts";
import type { Color } from "../models/Color.ts";
import type { FontName } from "../models/FontName.ts";
import calculateWorkbook from "../operations/workbook/calculateWorkbook.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import setWorkbookRangeFill from "../operations/workbookRange/setWorkbookRangeFill.ts";
import setWorkbookRangeFont from "../operations/workbookRange/setWorkbookRangeFont.ts";
import setWorkbookRangeFormat from "../operations/workbookRange/setWorkbookRangeFormat.ts";
import { generalCellFormat } from "../services/cellFormat.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath } from "../services/driveItem.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../services/workbookWorksheet.ts";
import { iterateRows } from "./iterateRows.ts";
import setWorkbookRangeValues from "./setWorkbookRangeValues.ts";
import tryDeleteDriveItem from "./tryDeleteDriveItem.ts";
const values = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];
const texts = values.map((row) => row.map((x) => x.toString()));

const emptyStyle: CellStyle = {
	merge: {},
	alignment: {},
	borders: {},
	protection: {},
	fill: {},
	font: {},
};

async function prepareRange() {
	const workbookName = generateTempFileName("xlsx");
	const workbookPath = driveItemPath(workbookName);
	const driveRef = getDefaultDriveRef();
	const workbook = await createWorkbook(driveRef, workbookPath);
	const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
	const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:C3");
	await setWorkbookRangeValues(rangeRef, values);
	await calculateWorkbook(rangeRef);
	return rangeRef;
}

describe("iterateRows", () => {
	it("Single request", async () => {
		const rangeRef = await prepareRange();

		try {
			let y = 0;
			for await (const row of iterateRows(rangeRef)) {
				row.forEach((cell, x) => {
					expect(cell.value).toEqual(values[y][x]);
					expect(cell.text).toEqual(texts[y][x]);
					expect(cell.format).toEqual(generalCellFormat);
					expect(cell.style).toEqual(emptyStyle);
				});
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
			for await (const row of iterateRows(rangeRef, 0, Number.POSITIVE_INFINITY, undefined, values[0].length)) {
				row.forEach((cell, x) => {
					expect(cell.value).toEqual(values[y][x]);
					expect(cell.text).toEqual(texts[y][x]);
					expect(cell.format).toEqual(generalCellFormat);
					expect(cell.style).toEqual(emptyStyle);
				});
				y++;
			}
		} finally {
			await tryDeleteDriveItem(rangeRef);
		}
	});

	it("retrieves just values when scope.values only is set", async () => {
		const rangeRef = await prepareRange();
		try {
			const scope = { values: true, text: false, format: false, style: false };
			let y = 0;
			for await (const row of iterateRows(rangeRef, 0, Number.POSITIVE_INFINITY, scope)) {
				row.forEach((cell, x) => {
					expect(cell.value).toEqual(values[y][x]);
					expect(cell.text).toEqual("");
					expect(cell.format).toEqual("");
					expect(cell.style).toEqual(emptyStyle);
				});
				y++;
			}
		} finally {
			await tryDeleteDriveItem(rangeRef);
		}
	});

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

		await calculateWorkbook(rangeRef);
		try {
			const scope = { values: false, text: false, format: false, style: true };
			for await (const row of iterateRows(rangeRef, 0, Number.POSITIVE_INFINITY, scope)) {
				row.forEach((cell, _) => {
					expect(cell.value).toEqual("");
					expect(cell.text).toEqual("");
					expect(cell.format).toEqual("");
					expect(cell.style).toEqual({
						merge: {},
						alignment: {
							horizontal: horizontalAlignment,
							vertical: verticalAlignment,
							wrapText: wrapText,
						},
						borders: {}, // TODO: Test once ability to protect has been added
						protection: {}, // TODO: Test once ability to protect has been added
						fill: {
							color: fillColor,
						},
						font: {
							name: fontName,
							size: fontSize,
							color: fontColor,
							italic: fontItalic,
							underline: fontUnderline,
							bold: fontBold,
						},
					} satisfies CellStyle); // TODO: Test more
				});
			}
		} finally {
			await tryDeleteDriveItem(rangeRef);
		}
	});
});
