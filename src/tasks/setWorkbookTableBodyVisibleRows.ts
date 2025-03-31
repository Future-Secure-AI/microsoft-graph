import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import NeverError from "../errors/NeverError.ts";
import type { RowIndex } from "../models/RowIndex.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import type { WorkbookTableRef } from "../models/WorkbookTableRef.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import insertWorkbookCells from "../operations/workbookRange/insertWorkbookCells.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import getWorkbookTableBodyRange from "../operations/workbookTable/getWorkbookTableBodyRange.ts";
import { cellAddressToIndexes, getAddressFirstCell, getAddressLastCell, indexesToBoxRangeAddress } from "../services/address.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";

/** Overwrite visible rows of a workbook table with the provided 2D array of values, inserting new rows at the end if needed. THIS IS SLOW as it must check each rows visibility. */
export async function setWorkbookTableBodyVisibleRows(tableRef: WorkbookTableRef, values: string[][]): Promise<void> {
	const visibleRange = await getWorkbookTableBodyRange(tableRef);
	if (values.some((row) => row.length !== visibleRange.columnCount)) {
		throw new InvalidArgumentError(`Invalid number of columns in input values. Expected all rows to have ${visibleRange.columnCount}.`);
	}

	const [startRowIndex, startColumnIndex] = cellAddressToIndexes(getAddressFirstCell(visibleRange.address));
	const [endRowIndex, endColumnIndex] = cellAddressToIndexes(getAddressLastCell(visibleRange.address));
	if (endColumnIndex - startColumnIndex + 1 !== visibleRange.columnCount) {
		throw new NeverError("Insane address");
	}

	let currentRowIndex: RowIndex = startRowIndex;

	for (const srcRowValues of values) {
		let dstRowRef: WorkbookRangeRef;
		let dstRow: WorkbookRange;
		let dstRowHidden = false;

		do {
			dstRowRef = createWorkbookRangeRef(tableRef, indexesToBoxRangeAddress(currentRowIndex, startColumnIndex, currentRowIndex, endColumnIndex));
			if (currentRowIndex > endRowIndex) {
				await insertWorkbookCells(dstRowRef, dstRowRef.address, "Down");
				dstRowHidden = false;
			} else {
				dstRow = await getWorkbookWorksheetRange(dstRowRef);
				dstRowHidden = dstRow.rowHidden ?? false;
			}
			currentRowIndex++;
		} while (dstRowHidden);

		await updateWorkbookRange(dstRowRef, { values: [srcRowValues] });
	}
}
