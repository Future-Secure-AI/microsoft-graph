import NotImplementedError from "../errors/NotImplementedError.ts";
import type { WorkbookTableRef } from "../models/WorkbookTableRef.ts";

/** Overwrite visible rows of a workbook table with the provided 2D array of values. THIS IS SLOW as it must check each rows visibility. */
export async function setWorkbookTableBodyVisibleRows(tableRef: WorkbookTableRef, values: string[][]): Promise<void> {
	throw new NotImplementedError();

	// const visibleRange = await getWorkbookTableBodyRange(tableRef);
	// if (values.some((row) => row.length !== visibleRange.columnCount)) {
	// 	throw new InvalidArgumentError(`Invalid number of columns in input values. Expected all rows to have ${visibleRange.columnCount}.`);
	// }

	// const [startRowIndex, startColumnIndex] = cellToIndexes(getAddressStart(visibleRange.address));
	// const [endRowIndex, endColumnIndex] = cellToIndexes(getAddressEnd(visibleRange.address));
	// if (endColumnIndex - startColumnIndex + 1 !== visibleRange.columnCount) {
	// 	throw new NeverError("Insane address");
	// }

	// let currentRowIndex: RowIndex = startRowIndex;

	// for (const srcRowValues of values) {
	// 	let dstRowRef: WorkbookRangeRef;
	// 	let dstRow: WorkbookRange;

	// 	do {
	// 		dstRowRef = createWorkbookRangeRef(tableRef, indexesToBox(currentRowIndex, startColumnIndex, currentRowIndex, endColumnIndex));
	// 		if (currentRowIndex > endRowIndex) {
	// 			await insertWorkbookCells(dstRowRef, dstRowRef.address, "Down");
	// 			console.debug(`Inserted row at ${dstRowRef.address}`); ////////////
	// 		}
	// 		dstRow = await getWorkbookWorksheetRange(dstRowRef);

	// 		console.debug(`Row ${currentRowIndex} is hidden: ${dstRow.hidden}`); /////////
	// 	} while (dstRow.hidden);

	// 	await updateWorkbookRange(dstRowRef, { values: [srcRowValues] });
	// 	console.debug(`Updated row ${currentRowIndex} to ${srcRowValues}`); /////////
	// 	currentRowIndex++;
	// }
}
