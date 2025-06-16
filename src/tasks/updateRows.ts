/**
 * Update rows in a given workbook range.
 * @module updateRows
 * @category Tasks
 * @experimental
 */
import { isEqual } from "lodash";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { BorderSide } from "../models/Border.ts";
import type { Cartesian } from "../models/Cartesian.ts";
import type { Cell } from "../models/Cell.ts";
import type { ColumnOffset } from "../models/Column.ts";
import type { RowOffset } from "../models/Row.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import mergeWorkbookRange from "../operations/workbookRange/mergeWorkbookRange.ts";
import setWorkbookRangeBorder from "../operations/workbookRange/setWorkbookRangeBorder.ts";
import setWorkbookRangeFill from "../operations/workbookRange/setWorkbookRangeFill.ts";
import setWorkbookRangeFont from "../operations/workbookRange/setWorkbookRangeFont.ts";
import setWorkbookRangeFormat from "../operations/workbookRange/setWorkbookRangeFormat.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import { subRange } from "../services/addressManipulation.ts";
import { maxCellsPerRequest } from "../services/batch.ts";
import { camelCaseToPascalCase } from "../services/stringCaseConversion.ts";

/**
 * Update rows in a given workbook range.
 * @param originRef Reference to the workbook range to update. Only the upper-left cell is used as an origin point.
 * @param cells Array of arrays of cells to update in the specified range.
 * @param maxCellsPerOperation Prescribe max cells to retrieve per operation. `null` automatically determines value. DO NOT SET EXCEPT FOR ADVANCED TUNING.
 * @remarks `undefined` values are left unchanged. Applying styling to cells is slow, use sparingly.
 * @experimental
 * @example
 * // Basic example:
 * await updateRows(rangeRef, [
 *   [{ value: 1 }, { value: 2 }],
 *   [{ value: 3 }, { value: 4 }],
 *   [{ value: 5 }, { value: 6 }],
 * ]);
 *
 * // Advanced example with cell formatting:
 * await updateRows(rangeRef, [
 *   [{ value: "Column A", style: { alignment: { horizontal: "Right" }, font: { bold: true } } }, { value: "Column B", style: { alignment: { horizontal: "Right" }, font: { bold: true } }  }],
 *   [{ value: 1, format: accountingCellFormat }, { value: "A" }],
 *   [{ value: 2, format: accountingCellFormat }, { value: "B" }],
 * ]);
 */
export default async function updateRows(originRef: WorkbookRangeRef, cells: Iterable<Partial<Cell>[]> | AsyncIterable<Partial<Cell>[]>, maxCellsPerOperation: number | null = null): Promise<void> {
	let maxRowsPerOperation: number | null = maxCellsPerOperation;
	let colCount: number | null = null;
	let rowCount = 0;
	const batch: Partial<Cell>[][] = [];

	for await (const row of cells) {
		if (colCount === null) {
			colCount = row.length;
		} else if (colCount !== row.length) {
			throw new InvalidArgumentError("Not all rows have the same number of cells. Ensure all rows are consistent in length.");
		}

		if (maxRowsPerOperation === null) {
			maxRowsPerOperation = calculateMaxRowsPerOperation(colCount, maxCellsPerOperation);
		}

		if (batch.push(row) >= maxRowsPerOperation) {
			rowCount += await writeBatch(batch, originRef, rowCount, colCount);
		}
	}
	if (colCount) {
		await writeBatch(batch, originRef, rowCount, colCount);
	}
}

async function writeBatch(cells: Partial<Cell>[][], originRef: WorkbookRangeRef, rowsCompleted: number, colCount: number): Promise<number> {
	const rowCount = cells.length;
	if (rowCount === 0) {
		return 0;
	}

	const rangeRef = subRange(originRef, rowsCompleted, rowCount, 0, colCount);

	await writeValuesTextFormat(cells, rangeRef);
	await writeMerges(cells, rangeRef, rowCount, colCount);
	await writeAlignment(cells, rangeRef, rowCount, colCount);
	await writeBorders(cells, rangeRef, rowCount, colCount);
	await writeFill(cells, rangeRef, rowCount, colCount);
	await writeFont(cells, rangeRef, rowCount, colCount);

	cells.length = 0;
	return rowCount;
}

async function writeValuesTextFormat(cells: Partial<Cell>[][], rangeRef: WorkbookRangeRef) {
	const values = cells.map((r) => r.map((c) => c.value));
	const text = cells.map((r) => r.map((c) => c.text));
	const numberFormat = cells.map((r) => r.map((c) => c.format));

	const hasValues = values.some((row) => row.some((value) => value !== undefined && value !== null));
	const hasText = text.some((row) => row.some((value) => value !== undefined && value !== null));
	const hasNumberFormat = numberFormat.some((row) => row.some((value) => value !== undefined && value !== null));

	if (!(hasValues || hasText || hasNumberFormat)) {
		return;
	}

	await updateWorkbookRange(rangeRef, {
		values: hasValues ? values : undefined,
		text: hasText ? text : undefined,
		numberFormat: hasNumberFormat ? numberFormat : undefined,
	});
}

async function writeMerges(cells: Partial<Cell>[][], rangeRef: WorkbookRangeRef, rowCount: number, colCount: number) {
	const merged = new Array(rowCount).fill(null).map(() => new Array(colCount).fill(false));

	for (let r = 0; r < rowCount; r++) {
		for (let c = 0; c < colCount; c++) {
			if (merged[r]?.[c]) {
				continue;
			}

			const merge = cells[r]?.[c]?.style?.merge;
			if (!(merge?.right || merge?.down)) {
				continue;
			}

			const rowSpan = (merge.down ?? 0) + 1;
			const colSpan = (merge.right ?? 0) + 1;

			// Mark all cells in this merge region as merged, throw if already marked
			for (let rr = r; rr < r + rowSpan; rr++) {
				for (let cc = c; cc < c + colSpan; cc++) {
					if (rr < rowCount && cc < colCount) {
						if ((merged[rr] as boolean[])[cc]) {
							throw new InvalidArgumentError(`Cell at (${rr}, ${cc}) is involved in multiple merges in this batch.`);
						}
						(merged[rr] as boolean[])[cc] = true;
					}
				}
			}

			const subRangeRef = subRange(rangeRef, r, rowSpan, c, colSpan);
			await mergeWorkbookRange(subRangeRef);
		}
	}
}

async function writeAlignment(cells: Partial<Cell>[][], originRef: WorkbookRangeRef, rowCount: number, colCount: number) {
	await forEachIdenticalRange(
		cells,
		rowCount,
		colCount,
		originRef,
		(cell) => cell.style?.alignment,
		async (subRangeRef, alignment) => {
			await setWorkbookRangeFormat(subRangeRef, {
				verticalAlignment: alignment.vertical ?? null,
				horizontalAlignment: alignment.horizontal ?? null,
				wrapText: alignment.wrapText ?? null,
			});
		},
	);
}

async function writeBorders(cells: Partial<Cell>[][], originRef: WorkbookRangeRef, rowCount: number, colCount: number) {
	await forEachIdenticalRange(
		cells,
		rowCount,
		colCount,
		originRef,
		(cell) => cell.style?.borders,
		async (subRangeRef, borders) => {
			for (const key of Object.keys(borders) as Array<keyof typeof borders>) {
				const edge = camelCaseToPascalCase(key as string) as BorderSide;
				const border = borders[key];
				if (border) {
					await setWorkbookRangeBorder(subRangeRef, edge, border);
				}
			}
		},
	);
}

async function writeFill(cells: Partial<Cell>[][], originRef: WorkbookRangeRef, rowCount: number, colCount: number) {
	await forEachIdenticalRange(
		cells,
		rowCount,
		colCount,
		originRef,
		(cell) => cell.style?.fill,
		async (subRangeRef, fill) => {
			await setWorkbookRangeFill(subRangeRef, fill);
		},
	);
}

async function writeFont(cells: Partial<Cell>[][], originRef: WorkbookRangeRef, rowCount: number, colCount: number) {
	await forEachIdenticalRange(
		cells,
		rowCount,
		colCount,
		originRef,
		(cell) => cell.style?.font,
		async (subRangeRef, font) => {
			await setWorkbookRangeFont(subRangeRef, font);
		},
	);
}

async function forEachIdenticalRange<T>(cells: Partial<Cell>[][], rowCount: number, colCount: number, originRef: WorkbookRangeRef, getValue: (cell: Partial<Cell>) => T | undefined, callback: (subRange: WorkbookRangeRef, value: T) => Promise<void> | void) {
	type Range = { cartesian: Cartesian; value: T };

	function findRanges(horizontalFirst: boolean): Range[] {
		const visited = new Array(rowCount * colCount).fill(false);
		const idx = (r: number, c: number) => r * colCount + c;
		const ranges: Range[] = [];

		for (let r = 0; r < rowCount; r++) {
			for (let c = 0; c < colCount; c++) {
				if (visited[idx(r, c)]) {
					continue;
				}
				const value = getValue(cells[r]?.[c] ?? {});
				let maxRow = r;
				let maxCol = c;

				if (horizontalFirst) {
					while (maxCol + 1 < colCount && !visited[idx(r, maxCol + 1)] && isEqual(getValue(cells[r]?.[maxCol + 1] ?? {}), value)) {
						maxCol++;
					}
					let canExpand = true;
					while (canExpand && maxRow + 1 < rowCount) {
						for (let cc = c; cc <= maxCol; cc++) {
							if (visited[idx(maxRow + 1, cc)] || !isEqual(getValue(cells[maxRow + 1]?.[cc] ?? {}), value)) {
								canExpand = false;
								break;
							}
						}
						if (canExpand) {
							maxRow++;
						}
					}
				} else {
					while (maxRow + 1 < rowCount && !visited[idx(maxRow + 1, c)] && isEqual(getValue(cells[maxRow + 1]?.[c] ?? {}), value)) {
						maxRow++;
					}
					let canExpand = true;
					while (canExpand && maxCol + 1 < colCount) {
						for (let rr = r; rr <= maxRow; rr++) {
							if (visited[idx(rr, maxCol + 1)] || !isEqual(getValue(cells[rr]?.[maxCol + 1] ?? {}), value)) {
								canExpand = false;
								break;
							}
						}
						if (canExpand) {
							maxCol++;
						}
					}
				}

				for (let rr = r; rr <= maxRow; rr++) {
					for (let cc = c; cc <= maxCol; cc++) {
						visited[idx(rr, cc)] = true;
					}
				}
				if (value) {
					ranges.push({
						cartesian: {
							ax: c as ColumnOffset,
							ay: r as RowOffset,
							bx: maxCol as ColumnOffset,
							by: maxRow as RowOffset,
						},
						value,
					});
				}
			}
		}
		return ranges;
	}

	const horizontalRanges = findRanges(true);
	const verticalRanges = findRanges(false);
	const bestRanges = horizontalRanges.length <= verticalRanges.length ? horizontalRanges : verticalRanges;

	for (const { cartesian, value } of bestRanges) {
		const subRangeRef = subRange(originRef, cartesian.ay, cartesian.by - cartesian.ay + 1, cartesian.ax, cartesian.bx - cartesian.ax + 1);
		await callback(subRangeRef, value);
	}
}

function calculateMaxRowsPerOperation(columnCount: number, overwriteMaxCellsPerOperation: number | null): number {
	const maxCellsPerOperation = overwriteMaxCellsPerOperation ?? maxCellsPerRequest;
	const maxRowsPerOperation = Math.floor(maxCellsPerOperation / columnCount);
	if (maxRowsPerOperation < 1) {
		throw new InvalidArgumentError("maxCellsPerOperation must be greater than or equal to the number of columns in the range."); // Excel supports up to 16k columns, which exceeds the assumed 10k cell limit per write. This might not be a problem, but not worth spending time checking this currently either.
	}
	return maxRowsPerOperation;
}
