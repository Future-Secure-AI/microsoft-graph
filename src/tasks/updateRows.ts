/**
 * Update rows in a given workbook range.
 * @module updateRows
 * @category Tasks
 * @experimental
 */
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Cell } from "../models/Cell.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import { subRange } from "../services/addressManipulation.ts";
import { maxCellsPerRequest } from "../services/batch.ts";

/**
 * Update rows in a given workbook range.
 * @param rangeRef Reference to the workbook range to update. Only the upper-left cell is used as an origin point.
 * @param cells Array of arrays of cells to update in the specified range.
 * @param maxCellsPerOperation Prescribe max cells to retrieve per operation. `null` automatically determines value. DO NOT SET EXCEPT FOR ADVANCED TUNING.
 * @remarks `undefined` values are left unchanged. Applying styling to cells is slow, use sparingly.
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
export default async function updateRows(originRef: WorkbookRangeRef, cells: Partial<Cell>[][], maxCellsPerOperation: number | null = null): Promise<void> {
	const firstRow = cells[0];
	if (!firstRow) {
		return;
	}
	const totalColumnCount = firstRow.length;
	if (cells.some((row) => row.length !== totalColumnCount)) {
		throw new InvalidArgumentError("Not all rows have the same number of cells. Ensure all rows are consistent in length.");
	}

	const maxRowsPerOperation = calculateMaxRowsPerOperation(totalColumnCount, maxCellsPerOperation);

	let rowsCompleted = 0;
	const batch: Partial<Cell>[][] = [];

	for await (const row of cells) {
		if (batch.push(row) >= maxRowsPerOperation) {
			rowsCompleted += await flushBatch(batch, originRef, rowsCompleted);
		}
	}

	rowsCompleted += await flushBatch(batch, originRef, rowsCompleted);
}

async function flushBatch(batch: Partial<Cell>[][], originRef: WorkbookRangeRef, rowsCompleted: number): Promise<number> {
	const columnCount = batch.at(0)?.length ?? 0;
	const rowCount = batch.length;
	const rangeRef = subRange(originRef, rowsCompleted, batch.length, 0, columnCount);

	const values = batch.map((r) => r.map((c) => c.value));
	const hasValues = values.some((row) => row.some((value) => value !== undefined && value !== null));

	const text = batch.map((r) => r.map((c) => c.text));
	const hasText = text.some((row) => row.some((value) => value !== undefined && value !== null));

	const numberFormat = batch.map((r) => r.map((c) => c.format));
	const hasNumberFormat = numberFormat.some((row) => row.some((value) => value !== undefined && value !== null));

	await updateWorkbookRange(rangeRef, {
		values: hasValues ? values : undefined,
		text: hasText ? text : undefined,
		numberFormat: hasNumberFormat ? numberFormat : undefined,
	});

	// TODO: style
	batch.length = 0;
	return rowCount;
}

function calculateMaxRowsPerOperation(columnCount: number, overwriteMaxCellsPerOperation: number | null): number {
	const maxCellsPerOperation = overwriteMaxCellsPerOperation ?? maxCellsPerRequest;
	const maxRowsPerOperation = Math.floor(maxCellsPerOperation / columnCount);
	if (maxRowsPerOperation < 1) {
		throw new InvalidArgumentError("maxCellsPerOperation must be greater than or equal to the number of columns in the range.");
	}
	return maxRowsPerOperation;
}
