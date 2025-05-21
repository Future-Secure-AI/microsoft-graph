import type { Cell } from "../models/Cell.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";
import getWorkbookWorksheetUsedRangeAddress from "../operations/workbookWorksheet/getWorkbookWorksheetUsedRangeAddress.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";
import iterateWorkbookRange from "./iterateWorkbookRange.ts";

/**
 * Iterates over the used range of a worksheet in a workbook.
 *
 * @param {WorkbookWorksheetRef} worksheetRef - The reference to the worksheet.
 * @param {number | null} [overwriteRowsPerRequest=null] - The number of rows to overwrite per request. If null, the default value is used.
 * @returns {AsyncIterable<Cell[]>} An async iterable of cell values in the used range.
 */
export default async function* iterateWorkbookWorksheetUsedRange(worksheetRef: WorkbookWorksheetRef, overwriteRowsPerRequest: number | null = null): AsyncIterableIterator<Cell[]> {
	const address = await getWorkbookWorksheetUsedRangeAddress(worksheetRef);
	const rangeRef = createWorkbookRangeRef(worksheetRef, address);
	yield* iterateWorkbookRange(rangeRef, overwriteRowsPerRequest);
}
