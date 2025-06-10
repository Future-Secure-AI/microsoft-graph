/**
 * Write rows to a workbook range.
 * @module writeWorkbookRows
 * @category Tasks
 */
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Cell } from "../models/Cell.ts";
import type { ColumnOffset } from "../models/Column.ts";
import type { RowOffset } from "../models/Row.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import { maxCellsPerRequest } from "../services/batch.ts";
import { addressToCartesian, cartesianToAddress } from "../services/cartesianAddress.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";

/**
 * Write rows to a workbook range.
 * @param originRef The reference to the workbook range where rows will be written. Only the upper-left is used as an origin point.
 * @param rows An iterable or async iterable of rows to write. Each row is an array of cells.
 * @param overwriteMaxRowsPerChunk Overwrite the number of rows per underlying request. DO NOT SET EXCEPT FOR ADVANCED TUNING.
 * @returns Number of rows written.
 * @example
 * const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B3");
 * await writeWorkbookRows(rangeRef, [
 *   [{ value: 1 }, { value: 2 }],
 *   [{ value: 3 }, { value: 4 }],
 *   [{ value: 5 }, { value: 6 }],
 * ]);
 */
export default async function writeWorkbookRows(originRef: WorkbookRangeRef, rows: Iterable<Partial<Cell>[]> | AsyncIterable<Partial<Cell>[]>, overwriteMaxRowsPerChunk: number | null = null): Promise<number> {
	let maxRowsPerUnderlyingRead: number | null = overwriteMaxRowsPerChunk;
	let cellsPerRow: number | null = null;
	let rowsCompleted = 0;
	const batch: Partial<Cell>[][] = [];

	for await (const row of rows) {
		if (cellsPerRow === null) {
			cellsPerRow = row.length;
		} else if (cellsPerRow !== row.length) {
			throw new InvalidArgumentError("Not all rows have the same number of cells. Ensure all rows are consistent in length.");
		}

		if (maxRowsPerUnderlyingRead === null) {
			maxRowsPerUnderlyingRead = Math.max(1, Math.floor(maxCellsPerRequest / cellsPerRow)); // Excel supports up to 16k columns, which exceeds the assumed 10k cell limit per write. This might not be a problem, but not worth spending time checking this currently either.
		}

		if (batch.push(row) >= maxRowsPerUnderlyingRead) {
			rowsCompleted += await flushBatch(batch, originRef, rowsCompleted);
		}
	}

	rowsCompleted += await flushBatch(batch, originRef, rowsCompleted);

	return rowsCompleted;
}

async function flushBatch(batch: Partial<Cell>[][], originRef: WorkbookRangeRef, rowsCompleted: number): Promise<number> {
	const first = batch[0];
	if (!first) {
		return 0;
	}

	const { ay, ax } = addressToCartesian(originRef.address);

	const count = batch.length;

	const address = cartesianToAddress({
		ay: (ay + rowsCompleted) as RowOffset,
		by: (ay + rowsCompleted + count - 1) as RowOffset,
		ax,
		bx: (ax + first.length - 1) as ColumnOffset,
	});

	const rangeRef = createWorkbookRangeRef(originRef, address);
	await updateWorkbookRange(rangeRef, {
		values: batch.map((r) => r.map((c) => c.value)),
		text: batch.map((r) => r.map((c) => c.text)),
		numberFormat: batch.map((r) => r.map((c) => c.format)),
	});

	batch.length = 0;
	return count;
}
