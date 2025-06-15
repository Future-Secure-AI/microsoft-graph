/**
 * Read all rows from a given workbook range.
 * @module readRows
 * @category Tasks
 * @experimental
 */

import type { Cell } from "../models/Cell.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import { defaultCellScope } from "../services/cell.ts";
import { iterateRows } from "./iterateRows.ts";

/**
 * Read all rows from a given workbook range.
 * @param rangeRef Reference to the workbook range to read.
 * @param scope Amount of detail to include for each cell.
 * @returns A promise that resolves to an array of rows, each containing an array of cells.
 * @remarks Where practical, prefer using {@link iterateRows} for more efficient memory usage.
 * @experimental
 * @example
 * const rows = await readRows(rangeRef);
 */
export default async function readRows(rangeRef: WorkbookRangeRef, scope = defaultCellScope): Promise<Cell[][]> {
	const rows: Cell[][] = [];
	for await (const { cells } of iterateRows(rangeRef, scope)) {
		rows.push(cells);
	}

	return rows;
}
