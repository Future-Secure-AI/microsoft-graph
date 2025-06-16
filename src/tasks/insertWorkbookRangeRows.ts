/**
 * Inserts rows into a workbook range.
 * @module insertRows
 * @category Tasks
 * @experimental
 */

import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Cell } from "../models/Cell.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import insertWorkbookCells from "../operations/workbookRange/insertWorkbookCells.ts";
import { superRange } from "../services/addressManipulation.ts";
import { maxCellsPerRequest } from "../services/batch.ts";
import updateWorkbookRangeRows from "./updateWorkbookRangeRows.ts";

/**
 * Inserts rows into a workbook range.
 * @param originRef Reference to the workbook range to update. Only the upper-left cell is used as an origin point.
 * @param cells Array of arrays of cells to update in the specified range.
 * @param maxCellsPerOperation Prescribe max cells to retrieve per operation. `null` automatically determines value. DO NOT SET EXCEPT FOR ADVANCED TUNING.
 * @experimental
 * @example
 * // Basic example:
 * await insertRows(originRef, [
 *   [{ value: "A1" }, { value: "B1" }, { value: "C1" }],
 *   [{ value: "A2" }, { value: "B2" }, { value: "C2" }],
 *  [{ value: "A3" }, { value: "B3" }, { value: "C3" }],
 * ])
 *
 * // Advanced example with cell formatting:
 * await insertRows(originRef, [
 *   [{ value: "A1", format: { fontColor: "red" } }, { value: "B1" }, { value: "C1" }],
 *   [{ value: "A2" }, { value: "B2", format: { fontColor: "blue" } }, { value: "C2" }],
 *   [{ value: "A3" }, { value: "B3" }, { value: "C3", format: { fontColor: "green" } }],
 * ]);
 */

export default async function insertWorkbookRangeRows(originRef: WorkbookRangeRef, cells: Iterable<Partial<Cell>[]> | AsyncIterable<Partial<Cell>[]>, maxCellsPerOperation: number | null = null): Promise<void> {
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
	if (colCount !== null) {
		rowCount += await writeBatch(batch, originRef, rowCount, colCount);
	}
}

async function writeBatch(batch: Partial<Cell>[][], originRef: WorkbookRangeRef, rowsCompleted: number, colCount: number): Promise<number> {
	const rowCount = batch.length;
	if (rowCount === 0) {
		return 0;
	}
	const rangeRef = superRange(originRef, rowsCompleted, rowCount, 0, colCount);
	await insertWorkbookCells(rangeRef, "Down");
	await updateWorkbookRangeRows(rangeRef, batch);
	batch.length = 0;
	return rowCount;
}

function calculateMaxRowsPerOperation(columnCount: number, overwriteMaxCellsPerOperation: number | null): number {
	const maxCellsPerOperation = overwriteMaxCellsPerOperation ?? maxCellsPerRequest;
	const maxRowsPerOperation = Math.floor(maxCellsPerOperation / columnCount);
	if (maxRowsPerOperation < 1) {
		throw new InvalidArgumentError("maxCellsPerOperation must be greater than or equal to the number of columns in the range."); // Excel supports up to 16k columns, which exceeds the assumed 10k cell limit per write. This might not be a problem, but not worth spending time checking this currently either.
	}
	return maxRowsPerOperation;
}
