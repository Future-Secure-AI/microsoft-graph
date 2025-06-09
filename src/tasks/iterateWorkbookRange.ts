/**
 * @module iterateWorkbookRange
 * @category Tasks
 * @hidden
 */

import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { CellText } from "../models/CellText.ts";
import type { CellValue } from "../models/CellValue.ts";
import type { NumberFormat } from "../models/NumberFormat.ts";
import type { Row } from "../models/Row.ts";
import type { RowOffset } from "../models/RowOffset.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import { composeAddress, countAddressColumns, decomposeAddress } from "../services/addressManipulation.ts";
import { columnAddressToOffset, rowAddressToOffset, rowOffsetToAddress } from "../services/addressOffset.ts";
import { maxCellsPerRequest } from "../services/batch.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";

/**
 * Iterates over the values of a workbook range in chunks, fetching data in manageable sizes.
 *
 * @param rangeRef - A reference to the workbook range to iterate over.
 * @param overwriteRowsPerRequest - Optional. The number of rows to fetch per request. If omitted, it is automatically calculated.
 * @returns An async iterable that yields rows of range values.
 * @deprecated Use `readWorkbookRows` instead.
 * @hidden
 */
export default async function* iterateWorkbookRange(rangeRef: WorkbookRangeRef, overwriteRowsPerRequest: number | null = null): AsyncIterable<{ rowOffset: RowOffset; row: Row }> {
	const address = rangeRef.address;
	const components = decomposeAddress(address);
	const columnsPerRow = columnAddressToOffset(components.endColumn) - columnAddressToOffset(components.startColumn) + 1;

	if (overwriteRowsPerRequest !== null && overwriteRowsPerRequest < 1) {
		throw new InvalidArgumentError("overwriteRowsPerRequest must be greater than 0");
	}
	const columnCount = countAddressColumns(address);

	const rowsPerRequest = overwriteRowsPerRequest ?? Math.floor(maxCellsPerRequest / columnsPerRow);

	const rangeStartRowOffset = rowAddressToOffset(components.startRow);
	const rangeEndRowOffset = rowAddressToOffset(components.endRow);

	let offset = 0 as RowOffset;

	for (let chunkRowOffset = rangeStartRowOffset; chunkRowOffset <= rangeEndRowOffset; chunkRowOffset = (chunkRowOffset + rowsPerRequest) as RowOffset) {
		const requestStartRowOffset = chunkRowOffset;
		const requestEndRowOffset = Math.min(chunkRowOffset + rowsPerRequest - 1, rangeEndRowOffset) as RowOffset;

		const chunkStartRow = rowOffsetToAddress(requestStartRowOffset);
		const chunkEndRow = rowOffsetToAddress(requestEndRowOffset);

		const requestAddress = composeAddress({
			startRow: chunkStartRow,
			endRow: chunkEndRow,
			startColumn: components.startColumn,
			endColumn: components.endColumn,
		});

		const requestRef = createWorkbookRangeRef(rangeRef, requestAddress);

		const range = await getWorkbookWorksheetRange(requestRef);
		const values = range.values satisfies CellValue[][];
		const text = range.text as CellText[][];
		const numberFormat = range.numberFormat as NumberFormat[][];
		const rowCount = values.length;

		for (let r = 0; r < rowCount; r++) {
			const row = Array.from({ length: columnCount }, (_, c) => ({
				text: text[r]?.[c] ?? ("" as CellText),
				value: values[r]?.[c] ?? "",
				numberFormat: numberFormat?.[r]?.[c] ?? ("" as NumberFormat),
			}));

			yield {
				rowOffset: offset,
				row,
			};

			offset++;
		}
	}
}
