import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import type { WorkbookTableRef } from "../models/WorkbookTableRef.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import insertWorkbookCells from "../operations/workbookRange/insertWorkbookCells.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import getWorkbookTableBodyRange from "../operations/workbookTable/getWorkbookTableBodyRange.ts";
import { getFirstRowAddress, incrementRowAddress, isAddressOverlapping } from "../services/addressManipulation.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";

/**
 * Overwrite visible rows of a workbook table with the provided 2D array of values, inserting new rows at the end if needed.
 * THIS IS SLOW as it must check each row's visibility.
 *
 * @param tableRef - A reference to the workbook table.
 * @param values - A 2D array of strings representing the values to set in the visible rows of the table.
 * @throws {InvalidArgumentError} If the number of columns in any row of `values` does not match the table's column count.
 * @returns Void when the operation is complete.
 */
export async function setWorkbookTableBodyVisibleRows(tableRef: WorkbookTableRef, values: string[][]): Promise<void> {
	const visibleRange = await getWorkbookTableBodyRange(tableRef);

	if (values.some((row) => row.length !== visibleRange.columnCount)) {
		throw new InvalidArgumentError(`Invalid number of columns in input values. Expected all rows to have ${visibleRange.columnCount}.`);
	}

	const firstRowAddress = getFirstRowAddress(visibleRange.address);
	let currentRowAddress = firstRowAddress;

	for (const rowValues of values) {
		let rowRef: WorkbookRangeRef;
		let rowHidden = false;

		do {
			rowRef = createWorkbookRangeRef(tableRef, currentRowAddress);
			if (isAddressOverlapping(currentRowAddress, visibleRange.address)) {
				const row = await getWorkbookWorksheetRange(rowRef);
				rowHidden = row.rowHidden ?? false;
			} else {
				await insertWorkbookCells(rowRef, rowRef.address, "Down");
				rowHidden = false;
			}
			currentRowAddress = incrementRowAddress(currentRowAddress);
		} while (rowHidden);

		await updateWorkbookRange(rowRef, { values: [rowValues] });
	}
}
