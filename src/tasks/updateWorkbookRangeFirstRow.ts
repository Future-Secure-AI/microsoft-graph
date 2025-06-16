/**
 * Update first row in a given workbook range.
 * @module updateFirstRow
 * @category Tasks
 * @experimental
 */

import type { Cell } from "../models/Cell.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import updateWorkbookRangeRows from "./updateWorkbookRangeRows.ts";

/**
 * Update first row in a given workbook range.
 * @param originRef Reference to the workbook range to update. Only the upper-left cell is used as an origin point.
 * @param cells Array of arrays of cells to update in the specified range.
 * @remarks `undefined` values are left unchanged. Applying styling to cells is slow, use sparingly.
 * @experimental
 * @example
 * // Basic example:
 * await updateFirstRow(rangeRef, [{ value: 1 }, { value: 2 }]);
 *
 * // Advanced example with cell formatting:
 * await updateRows(rangeRef, [
 *  { value: "Column A", style: { alignment: { horizontal: "Right" }, font: { bold: true } } },
 *  { value: "Column B", style: { alignment: { horizontal: "Right" }, font: { bold: true } } }
 * ]);
 */
export default async function updateWorkbookRangeFirstRow(originRef: WorkbookRangeRef, cells: Partial<Cell>[]): Promise<void> {
	const rows = [cells];
	await updateWorkbookRangeRows(originRef, rows);
}
