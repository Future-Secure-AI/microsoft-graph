import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import type { WorkbookTableRef } from "../models/WorkbookTableRef.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import insertWorkbookCells from "../operations/workbookRange/insertWorkbookCells.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import getWorkbookTableBodyRange from "../operations/workbookTable/getWorkbookTableBodyRange.ts";
import { getFirstRowAddress, incrementRowAddress, isAddressOverlapping } from "../services/addressManipulation.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";

/** Overwrite visible rows of a workbook table with the provided 2D array of values, inserting new rows at the end if needed. THIS IS SLOW as it must check each rows visibility. */
export async function setWorkbookTableBodyVisibleRows(tableRef: WorkbookTableRef, values: string[][]): Promise<void> {
	const visibleRange = await getWorkbookTableBodyRange(tableRef);

	if (values.some((row) => row.length !== visibleRange.columnCount)) {
		throw new InvalidArgumentError(`Invalid number of columns in input values. Expected all rows to have ${visibleRange.columnCount}.`);
	}

	const dstFirstRowAddress = getFirstRowAddress(visibleRange.address);
	let dstCurrentRowAddress = dstFirstRowAddress;

	for (const srcRowValues of values) {
		let dstRowRef: WorkbookRangeRef;
		let dstRow: WorkbookRange;
		let dstRowHidden = false;

		do {
			dstRowRef = createWorkbookRangeRef(tableRef, dstCurrentRowAddress);
			if (isAddressOverlapping(dstCurrentRowAddress, visibleRange.address)) {
				dstRow = await getWorkbookWorksheetRange(dstRowRef);
				dstRowHidden = dstRow.rowHidden ?? false;
			} else {
				await insertWorkbookCells(dstRowRef, dstRowRef.address, "Down");
				dstRowHidden = false;
			}
			dstCurrentRowAddress = incrementRowAddress(dstCurrentRowAddress);
		} while (dstRowHidden);

		await updateWorkbookRange(dstRowRef, { values: [srcRowValues] });
	}
}
