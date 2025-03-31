import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import NeverError from "../errors/NeverError.ts";
import type { RowIndex } from "../models/RowIndex.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import type { WorkbookTableRef } from "../models/WorkbookTableRef.ts";
import insertWorkbookCells from "../operations/workbookRange/insertWorkbookCells.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import getWorkbookTableBodyRange from "../operations/workbookTable/getWorkbookTableBodyRange.ts";
import getWorkbookWorksheetRange from "../operations/workbookWorksheet/getWorkbookWorksheetRange.ts";
import { cellToIndexes, getAddressEnd, getAddressStart, indexesToBox } from "../services/address.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";

/** Overwrite visible rows of a workbook table with the provided 2D array of values. THIS IS SLOW as it must check each rows visibility. */
export async function setWorkbookTableBodyVisibleRows(tableRef: WorkbookTableRef, values: string[][]): Promise<void> {
	const visibleRange = await getWorkbookTableBodyRange(tableRef);
	if (values.some((row) => row.length !== visibleRange.columnCount)) {
		throw new InvalidArgumentError(`Invalid number of columns in input values. Expected all rows to have ${visibleRange.columnCount}.`);
	}

	const [startRowIndex, startColumnIndex] = cellToIndexes(getAddressStart(visibleRange.address));
	const [endRowIndex, endColumnIndex] = cellToIndexes(getAddressEnd(visibleRange.address));
	if (endColumnIndex - startColumnIndex + 1 !== visibleRange.columnCount) {
		throw new NeverError("Insane address");
	}

	let currentRowIndex: RowIndex = startRowIndex;

	for (const srcRowValues of values) {
		let dstRowRef: WorkbookRangeRef;
		let dstRow: WorkbookRange;

		do {
			dstRowRef = createWorkbookRangeRef(tableRef, indexesToBox(currentRowIndex, startColumnIndex, currentRowIndex, endColumnIndex));
			if (currentRowIndex > endRowIndex) {
				await insertWorkbookCells(dstRowRef, dstRowRef.address, "Down");
			}
			dstRow = await getWorkbookWorksheetRange(dstRowRef);
		} while (dstRow.hidden);

		await updateWorkbookRange(dstRowRef, { values: [srcRowValues] });
		currentRowIndex++;
	}
}
