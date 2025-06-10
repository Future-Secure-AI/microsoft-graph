/**
 * @module getRangeLastUsedCell
 * @category Tasks
 * @hidden
 */

import ProtocolError from "../errors/ProtocolError.ts";
import type { CellAddress } from "../models/Address.ts";
import type { CellValue } from "../models/Cell.ts";
import type { ColumnOffset } from "../models/ColumnOffset.ts";
import type { RowOffset } from "../models/RowOffset.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import { getFirstCellAddress, offsetAddress } from "../services/addressManipulation.ts";

/**
 * Get the last used cell (i.e., the most lower-right cell) in a given range.
 *
 * @param rangeRef Reference to the workbook range to search.
 * @throws {@link ProtocolError} Server returns an unexpected value.
 * @returns The last used cell's value and address, or `null` if no cells are used.
 * @deprecated Use `getWorkbookWorksheetUsedRangeRef` and `subAddress` instead.
 * @hidden
 */
export default async function getRangeLastUsedCell(rangeRef: WorkbookRangeRef): Promise<{ value: CellValue; address: CellAddress } | null> {
	const range = await getWorkbookWorksheetRange(rangeRef);

	const { rowCount, columnCount } = range;
	if (rowCount === undefined || columnCount === undefined) {
		throw new ProtocolError("Counts missing");
	}

	const values = range.values as (string | number | boolean | null)[][];
	if (values === undefined) {
		throw new ProtocolError("Range values missing");
	}

	for (let rowIndex = (rowCount - 1) as RowOffset; rowIndex >= 0; rowIndex--) {
		const row = values[rowIndex];
		if (row === undefined) {
			throw new ProtocolError("Row missing");
		}

		for (let columnIndex = (columnCount - 1) as ColumnOffset; columnIndex >= 0; columnIndex--) {
			const cell = row[columnIndex];
			if (cell === undefined) {
				throw new ProtocolError("Cell missing");
			}

			if (cell !== null && cell !== "") {
				const firstCellAddress = getFirstCellAddress(rangeRef.address);
				const lastUsedCellAddress = offsetAddress(firstCellAddress, columnIndex, rowIndex) as CellAddress;

				return {
					value: cell,
					address: lastUsedCellAddress,
				};
			}
		}
	}

	return null;
}
