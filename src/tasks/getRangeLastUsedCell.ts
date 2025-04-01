import ProtocolError from "../errors/ProtocolError.ts";
import type { ColumnOffset } from "../models/ColumnOffset.ts";
import type { RowOffset } from "../models/RowOffset.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import { getFirstCellAddress, offsetAddress } from "../services/addressManipulation.ts";

/**
 * Get the last used cell (i.e., the most lower-right cell) in a given range.
 *
 * @param rangeRef - A reference to the workbook range to search.
 * @throws {ProtocolError} If the range's row or column counts, or values, are missing.
 * @returns The last used cell's value and address, or `null` if no cells are used.
 */
export default async function getRangeLastUsedCell(rangeRef: WorkbookRangeRef): Promise<{ value: string | number | boolean | null; address: string } | null> {
	// TODO: Consider adding chunking if the range is too large
	// TODO: Reduce cells returned by using "used range"?

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
				const lastUsedCellAddress = offsetAddress(firstCellAddress, columnIndex, rowIndex);

				return {
					value: cell,
					address: lastUsedCellAddress,
				};
			}
		}
	}

	return null;
}
