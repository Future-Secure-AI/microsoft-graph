/**
 * Inserts a single row into a workbook range.
 * @module insertWorkbookRangeRow
 * @category Tasks
 * @experimental
 */

import type { Cell } from "../models/Cell.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import insertWorkbookRangeRows from "./insertWorkbookRangeRows.ts";

/**
 * Inserts a single row into a workbook range.
 * @param originRef Reference to the workbook range to update. Only the upper-left cell is used as an origin point.
 * @param row Array of cells to insert as a single row.
 * @experimental
 * @example
 * await insertWorkbookRangeRow(originRef, [{ value: "A1" }, { value: "B1" }, { value: "C1" }]);
 */
export default async function insertWorkbookRangeRow(originRef: WorkbookRangeRef, row: Partial<Cell>[]): Promise<void> {
	await insertWorkbookRangeRows(originRef, [row]);
}
