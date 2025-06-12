/**
 * Iterate over the rows in a given worksheet range. (EXPERIMENTAL)
 * @module iterateRows
 * @category Tasks
 * @experimental
 */

import type { WorkbookRangeFormat } from "@microsoft/microsoft-graph-types";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Cell, CellBorder, CellBorderSide, CellBorderType, CellBorderWeight, CellFormat, CellHorizontalAlignment, CellScope, CellStyle, CellText, CellUnderline, CellValue, CellVerticalAlignment } from "../models/Cell.ts";
import type { Color } from "../models/Color.ts";
import type { FontName } from "../models/FontName.ts";
import type { Row } from "../models/Row.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import getWorkbookRangeFill from "../operations/workbookRange/getWorkbookRangeFill.ts";
import getWorkbookRangeFont from "../operations/workbookRange/getWorkbookRangeFont.ts";
import getWorkbookRangeFormat from "../operations/workbookRange/getWorkbookRangeFormat.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import { countAddressColumns, countAddressRows, subRange } from "../services/addressManipulation.ts";
import { maxCellsPerRequest } from "../services/batch.ts";

const defaultScope: CellScope = { values: true, text: true, format: true, style: false };
const emptyStyle: CellStyle = {
	merge: {},
	alignment: {},
	borders: {},
	protection: {},
	fill: {},
	font: {},
};

/**
 * Iterate over the rows in a given worksheet range.
 * @param rangeRef Reference to the workbook range to iterate over.
 * @param skip Number of rows to skip before starting to yield rows. Can be negative to get last rows (e.g., -1 for the last row).
 * @param take Max number of rows to yield. `POSITIVE_INFINITY` returns all rows.
 * @param scope Amount of detail to include for each cell.
 * @param maxCellsPerOperation Prescribe max cells to retrieve per operation. `null` automatically determines value. DO NOT SET EXCEPT FOR ADVANCED TUNING.
 * @remarks Including `style` in the scope requires over three operations for each and every cell. Use this sparingly!
 * @example
 * for await (const row of iterateRows(rangeRef)) {
 *   console.log(row);
 * }
 */
export async function* iterateRows(rangeRef: WorkbookRangeRef, skip = 0, take: number = Number.POSITIVE_INFINITY, scope: CellScope = defaultScope, maxCellsPerOperation: number | null = null): AsyncIterable<Row> {
	const totalRangeRef = subRange(rangeRef, skip, take);

	const totalColumnCount = countAddressColumns(totalRangeRef.address);
	const totalRowCount = countAddressRows(totalRangeRef.address);
	const maxRowsPerOperation = calculateMaxRowsPerOperation(totalColumnCount, maxCellsPerOperation);
	const rangeSelect = scopeToRangeSelect(scope);

	for (let operationRowStart = 0; operationRowStart < totalRowCount; operationRowStart += maxRowsPerOperation) {
		const operationRowCount = Math.min(maxRowsPerOperation, totalRowCount - operationRowStart);
		const operationRangeRef = subRange(totalRangeRef, operationRowStart, operationRowCount);

		const range = rangeSelect.values || rangeSelect.text || rangeSelect.numberFormat ? await getWorkbookWorksheetRange(operationRangeRef, rangeSelect) : null;

		for (let rowIndex = 0; rowIndex < operationRowCount; rowIndex++) {
			const row: Row = [];
			for (let columnIndex = 0; columnIndex < totalColumnCount; columnIndex++) {
				const value = (range?.values?.[rowIndex]?.[columnIndex] ?? "") as CellValue; // The root of these is undefined if that detail isn't in scope
				const text = (range?.text?.[rowIndex]?.[columnIndex] ?? "") as CellText;
				const format = (range?.numberFormat?.[rowIndex]?.[columnIndex] ?? "") as CellFormat;
				const style = scope.style ? await getStyle(subRange(rangeRef, rowIndex, 1, columnIndex, 1)) : emptyStyle; // This line is potentially expensive

				row.push({
					value,
					text,
					format,
					style,
				} satisfies Cell);
			}

			yield row;
		}
	}
}

async function getStyle(rangeRef: WorkbookRangeRef): Promise<CellStyle> {
	const format = await getWorkbookRangeFormat(rangeRef); // horizontalAlignment, verticalAlignment, wrapText
	const fill = await getWorkbookRangeFill(rangeRef); // fill color
	const font = await getWorkbookRangeFont(rangeRef); // bold, color, italic, name, size, underling

	return {
		merge: {}, // Not provided by any API
		alignment: {
			vertical: format.verticalAlignment as CellVerticalAlignment,
			horizontal: format.horizontalAlignment as CellHorizontalAlignment,
			wrapText: format.wrapText ?? undefined,
		},
		borders: {
			// TODO: Need border setting/retrieval operations
			// top: extractBorderStyle(format, "EdgeTop"),
			// bottom: extractBorderStyle(format, "EdgeBottom"),
			// left: extractBorderStyle(format, "EdgeLeft"),
			// right: extractBorderStyle(format, "EdgeRight"),
			// insideVertical: extractBorderStyle(format, "InsideVertical"),
			// insideHorizontal: extractBorderStyle(format, "InsideHorizontal"),
			// diagonalDown: extractBorderStyle(format, "DiagonalDown"),
			// diagonalUp: extractBorderStyle(format, "DiagonalUp"),
		},
		protection: {
			formulaHidden: format.protection?.formulaHidden ?? undefined,
			locked: format.protection?.locked ?? undefined,
		},
		fill: {
			color: fill.color as Color,
		},
		font: {
			name: font.name as FontName,
			size: font.size as number,
			color: font.color as Color,
			bold: font.bold as boolean,
			italic: font.italic as boolean,
			underline: font.underline as CellUnderline,
		},
	};

	function extractBorderStyle(response: WorkbookRangeFormat, side: CellBorderSide): CellBorder | undefined {
		if (!response.borders) {
			return undefined;
		}

		const a = response.borders.find((x) => x.sideIndex === side);
		if (!a) {
			return undefined;
		}

		return {
			color: a.color as Color,
			side: a.sideIndex as CellBorderSide,
			style: a.style as CellBorderType,
			weight: a.weight as CellBorderWeight,
		};
	}
}

function calculateMaxRowsPerOperation(columnCount: number, overwriteMaxCellsPerOperation: number | null): number {
	const maxCellsPerOperation = overwriteMaxCellsPerOperation ?? maxCellsPerRequest;
	const maxRowsPerOperation = Math.floor(maxCellsPerOperation / columnCount);
	if (maxRowsPerOperation < 1) {
		throw new InvalidArgumentError("maxCellsPerOperation must be greater than or equal to the number of columns in the range.");
	}
	return maxRowsPerOperation;
}
function scopeToRangeSelect(scope: CellScope) {
	return { values: scope.values, text: scope.text, numberFormat: scope.format, style: false };
}
