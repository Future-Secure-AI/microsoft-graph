/**
 * Iterate over the rows in a given worksheet range.
 * @module iterateRows
 * @category Tasks
 * @experimental
 */

import type { WorkbookRangeBorder } from "@microsoft/microsoft-graph-types";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Border, BorderSide, BorderType, BorderWeight } from "../models/Border.ts";
import type { Cell, CellFormat, CellHorizontalAlignment, CellScope, CellStyle, CellText, CellUnderline, CellValue, CellVerticalAlignment } from "../models/Cell.ts";
import type { Color } from "../models/Color.ts";
import type { FontName } from "../models/FontName.ts";
import type { Row } from "../models/Row.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import getWorkbookRangeFill from "../operations/workbookRange/getWorkbookRangeFill.ts";
import getWorkbookRangeFont from "../operations/workbookRange/getWorkbookRangeFont.ts";
import getWorkbookRangeFormat from "../operations/workbookRange/getWorkbookRangeFormat.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import listWorkbookRangeBorders from "../operations/workbookRange/listWorkbookRangeBorders.ts";
import { countAddressColumns, countAddressRows, subRange } from "../services/addressManipulation.ts";
import { maxCellsPerRequest } from "../services/batch.ts";

const defaultScope: Partial<CellScope> = { values: true, text: true, format: true };

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
export async function* iterateRows(rangeRef: WorkbookRangeRef, skip = 0, take: number = Number.POSITIVE_INFINITY, scope: Partial<CellScope> = defaultScope, maxCellsPerOperation: number | null = null): AsyncIterable<Row> {
	const totalRangeRef = subRange(rangeRef, skip, take);

	const totalColumnCount = countAddressColumns(totalRangeRef.address);
	const totalRowCount = countAddressRows(totalRangeRef.address);
	const maxRowsPerOperation = calculateMaxRowsPerOperation(totalColumnCount, maxCellsPerOperation);
	const rangeSelect = scopeToRangeSelect(scope);

	for (let operationRowStart = 0; operationRowStart < totalRowCount; operationRowStart += maxRowsPerOperation) {
		const operationRowCount = Math.min(maxRowsPerOperation, totalRowCount - operationRowStart);
		const operationRangeRef = subRange(totalRangeRef, operationRowStart, operationRowCount);

		const range = rangeSelect ? await getWorkbookWorksheetRange(operationRangeRef, rangeSelect) : null;

		for (let rowIndex = 0; rowIndex < operationRowCount; rowIndex++) {
			const row: Row = [];
			for (let columnIndex = 0; columnIndex < totalColumnCount; columnIndex++) {
				const value = (range?.values?.[rowIndex]?.[columnIndex] ?? "") as CellValue; // The root of these is undefined if that detail isn't in scope
				const text = (range?.text?.[rowIndex]?.[columnIndex] ?? "") as CellText;
				const format = (range?.numberFormat?.[rowIndex]?.[columnIndex] ?? "") as CellFormat;
				const style = await getStyle(subRange(rangeRef, rowIndex, 1, columnIndex, 1), scope); // This line is potentially expensive

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

async function getStyle(rangeRef: WorkbookRangeRef, scope: Partial<CellScope>): Promise<CellStyle> {
	const alignment = scope.alignment ? await getWorkbookRangeFormat(rangeRef) : null;
	const borders = scope.borders ? await listWorkbookRangeBorders(rangeRef) : null;
	const fill = scope.fill ? await getWorkbookRangeFill(rangeRef) : null;
	const font = scope.font ? await getWorkbookRangeFont(rangeRef) : null;

	return {
		merge: {
			/* Not provided by API */
		},
		alignment: {
			vertical: alignment?.verticalAlignment as CellVerticalAlignment,
			horizontal: alignment?.horizontalAlignment as CellHorizontalAlignment,
			wrapText: alignment?.wrapText ?? undefined,
		},
		borders: {
			top: extractBorderStyle(borders, "EdgeTop"),
			bottom: extractBorderStyle(borders, "EdgeBottom"),
			left: extractBorderStyle(borders, "EdgeLeft"),
			right: extractBorderStyle(borders, "EdgeRight"),
			insideVertical: extractBorderStyle(borders, "InsideVertical"),
			insideHorizontal: extractBorderStyle(borders, "InsideHorizontal"),
			diagonalDown: extractBorderStyle(borders, "DiagonalDown"),
			diagonalUp: extractBorderStyle(borders, "DiagonalUp"),
		},
		fill: {
			color: fill?.color as Color,
		},
		font: {
			name: font?.name as FontName,
			size: font?.size as number,
			color: font?.color as Color,
			bold: font?.bold as boolean,
			italic: font?.italic as boolean,
			underline: font?.underline as CellUnderline,
		},
	};

	function extractBorderStyle(borders: WorkbookRangeBorder[] | null, side: BorderSide): Border | undefined {
		if (!borders) {
			return undefined;
		}
		const border = borders.find((x) => x.sideIndex === side);
		if (!border) {
			return undefined;
		}

		return {
			color: border.color as Color,
			style: border.style as BorderType,
			weight: border.weight as BorderWeight,
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
function scopeToRangeSelect(scope: Partial<CellScope>) {
	if (!(scope.values || scope.text || scope.format)) {
		return null;
	}
	return { values: scope.values ?? false, text: scope.text ?? false, numberFormat: scope.format ?? false };
}
