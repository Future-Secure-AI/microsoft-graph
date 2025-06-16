/**
 * Iterate over the rows in a given worksheet range.
 * @module iterateRows
 * @category Tasks
 * @experimental
 */

import type { WorkbookRangeBorder } from "@microsoft/microsoft-graph-types";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Border, BorderSide, BorderStyle, BorderWeight } from "../models/Border.ts";
import type { Cell, CellFormat, CellHorizontalAlignment, CellScope, CellText, CellUnderline, CellValue, CellVerticalAlignment } from "../models/Cell.ts";
import type { Color } from "../models/Color.ts";
import type { ColumnOffset } from "../models/Column.ts";
import type { FontName } from "../models/FontName.ts";
import type { RowOffset } from "../models/Row.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import getWorkbookRangeFill from "../operations/workbookRange/getWorkbookRangeFill.ts";
import getWorkbookRangeFont from "../operations/workbookRange/getWorkbookRangeFont.ts";
import getWorkbookRangeFormat from "../operations/workbookRange/getWorkbookRangeFormat.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import listWorkbookRangeBorders from "../operations/workbookRange/listWorkbookRangeBorders.ts";
import { countAddressColumns, countAddressRows, subRange } from "../services/addressManipulation.ts";
import { maxCellsPerRequest } from "../services/batch.ts";
import { defaultCellScope } from "../services/cell.ts";

/**
 * Represents a row yielded by the {@link iterateRows} generator.
 * @property {Cell[]} cells Array of cells in the row, each containing value, text, format, and optionally style information depending on the scope.
 * @property {RowOffset} offset Zero-based offset of the row within the original range.
 * @property {boolean} isFirst If this is the first row in the iteration.
 * @property {boolean} isLast If this is the last row in the iteration.
 */
export type IteratedRow = {
	cells: Cell[];
	offset: RowOffset;
	isFirst: boolean;
	isLast: boolean;
};

/**
 * Iterate over the rows in a given worksheet range.
 * @param rangeRef Reference to the workbook range to iterate over.
 * @param scope Amount of detail to include for each cell.
 * @param maxCellsPerOperation Prescribe max cells to retrieve per operation. `null` automatically determines value. DO NOT SET EXCEPT FOR ADVANCED TUNING.
 * @experimental
 * @example
 * for await (const { row } of iterateRows(rangeRef)) {
 *   console.log(row);
 * }
 */
export async function* iterateRows(rangeRef: WorkbookRangeRef, scope: Partial<CellScope> = defaultCellScope, maxCellsPerOperation: number | null = null): AsyncIterable<IteratedRow> {
	const totalColumnCount = countAddressColumns(rangeRef.address);
	const totalRowCount = countAddressRows(rangeRef.address);
	const maxRowsPerOperation = calculateMaxRowsPerOperation(totalColumnCount, maxCellsPerOperation);
	const rangeSelect = scopeToRangeSelect(scope);

	for (let operationRowStart = 0; operationRowStart < totalRowCount; operationRowStart += maxRowsPerOperation) {
		const operationRowCount = Math.min(maxRowsPerOperation, totalRowCount - operationRowStart);
		const operationRangeRef = subRange(rangeRef, operationRowStart, operationRowCount);

		const range = rangeSelect ? await getWorkbookWorksheetRange(operationRangeRef, rangeSelect) : null;

		for (let operationRowOffset = 0 as RowOffset; operationRowOffset < operationRowCount; operationRowOffset++) {
			const cells: Cell[] = [];
			for (let columnOffset = 0 as ColumnOffset; columnOffset < totalColumnCount; columnOffset++) {
				const value = (range?.values?.[operationRowOffset]?.[columnOffset] ?? "") as CellValue; // The root of these is undefined if that detail isn't in scope
				const text = (range?.text?.[operationRowOffset]?.[columnOffset] ?? "") as CellText;
				const format = (range?.numberFormat?.[operationRowOffset]?.[columnOffset] ?? "") as CellFormat;
				const merge = {}; // No API available to retrieve merge information
				const alignment = await getAlignment(rangeRef, scope);
				const borders = await getBorders(rangeRef, scope);
				const fill = await getFill(rangeRef, scope);
				const font = await getFont(rangeRef, scope);

				cells.push({
					value,
					text,
					format,
					merge,
					alignment,
					borders,
					fill,
					font,
				} satisfies Cell);
			}

			const offset = (operationRowStart + operationRowOffset) as RowOffset;
			const isFirst = offset === 0;
			const isLast = offset === totalRowCount - 1;

			yield {
				cells,
				offset,
				isFirst,
				isLast,
			};
		}
	}
}

async function getFont(rangeRef: WorkbookRangeRef, scope: Partial<CellScope>) {
	if (!scope.font) {
		return {};
	}

	const response = await getWorkbookRangeFont(rangeRef);

	return {
		name: response?.name as FontName,
		size: response?.size as number,
		color: response?.color as Color,
		bold: response?.bold as boolean,
		italic: response?.italic as boolean,
		underline: response?.underline as CellUnderline,
	};
}

async function getFill(rangeRef: WorkbookRangeRef, scope: Partial<CellScope>) {
	if (!scope.fill) {
		return {};
	}
	const response = await getWorkbookRangeFill(rangeRef);

	return {
		color: response?.color as Color,
	};
}

async function getBorders(rangeRef: WorkbookRangeRef, scope: Partial<CellScope>) {
	if (!scope.borders) {
		return {};
	}
	const response = await listWorkbookRangeBorders(rangeRef);

	return {
		edgeTop: extractBorderStyle(response, "EdgeTop"),
		edgeBottom: extractBorderStyle(response, "EdgeBottom"),
		edgeLeft: extractBorderStyle(response, "EdgeLeft"),
		edgeRight: extractBorderStyle(response, "EdgeRight"),
		insideVertical: extractBorderStyle(response, "InsideVertical"),
		insideHorizontal: extractBorderStyle(response, "InsideHorizontal"),
		diagonalDown: extractBorderStyle(response, "DiagonalDown"),
		diagonalUp: extractBorderStyle(response, "DiagonalUp"),
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
			style: border.style as BorderStyle,
			weight: border.weight as BorderWeight,
		};
	}
}

async function getAlignment(rangeRef: WorkbookRangeRef, scope: Partial<CellScope>) {
	if (!scope.alignment) {
		return {};
	}
	const response = await getWorkbookRangeFormat(rangeRef);

	return {
		vertical: response?.verticalAlignment as CellVerticalAlignment,
		horizontal: response?.horizontalAlignment as CellHorizontalAlignment,
		wrapText: response?.wrapText ?? undefined,
	};
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
