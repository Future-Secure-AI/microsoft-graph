/**
 * Read the first row from a given workbook range.
 * @module readWorkbookRangeFirstRow
 * @category Tasks
 * @experimental
 */

import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Cell } from "../models/Cell.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import { subRange } from "../services/addressManipulation.ts";
import { defaultCellScope } from "../services/cell.ts";
import { iterateWorkbookRangeRows } from "./iterateWorkbookRangeRows.ts";

/** * Read the first row from a given workbook range.
 * @param rangeRef Reference to the workbook range to read.
 * @param scope Amount of detail to include for each cell.
 * @returns A promise that resolves to an array of cells in the first row.
 * @remarks Particularly useful for reading header rows.
 * @example
 * const firstRow = await readFirstRow(rangeRef);
 */
export default async function readWorkbookRangeFirstRow(rangeRef: WorkbookRangeRef, scope = defaultCellScope): Promise<Cell[]> {
	const firstRowRef = subRange(rangeRef, 0, 1);

	for await (const { cells } of iterateWorkbookRangeRows(firstRowRef, scope)) {
		return cells;
	}

	throw new InvalidArgumentError("No rows in the specified range.");
}
