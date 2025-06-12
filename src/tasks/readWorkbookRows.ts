/**
 * Iterates over the rows in a given worksheet range.
 * @module readWorkbookRows
 * @category Tasks
 */

import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { Cell, CellFormat, CellStyle, CellText, CellValue } from "../models/Cell.ts";
import type { Row, RowOffset } from "../models/Row.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import { composeAddress, countAddressColumns, decomposeAddress } from "../services/addressManipulation.ts";
import { columnAddressToOffset, rowAddressToOffset, rowOffsetToAddress } from "../services/addressOffset.ts";
import { maxCellsPerRequest } from "../services/batch.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";

const emptyStyle: CellStyle = {
	merge: {},
	alignment: {},
	borders: {},
	protection: {},
	fill: {},
	font: {},
};

/**
 * Iterates over the rows in a given worksheet range.
 *
 * @param rangeRef Reference to the workbook range to iterate over.
 * @param overwriteMaxRowsPerChunk Overwrite the number of rows per underlying request. DO NOT SET EXCEPT FOR ADVANCED TUNING.
 * @returns An async iterable that yields rows of range values.
 * @throws {@link InvalidArgumentError} If `overwriteMaxRowsPerChunk` is set to a value less than 1.
 */
export default async function* readWorkbookRows(rangeRef: WorkbookRangeRef, overwriteMaxRowsPerChunk: number | null = null): AsyncIterable<Row> {
	const address = rangeRef.address;
	const components = decomposeAddress(address);
	const columnsPerRow = columnAddressToOffset(components.endColumn) - columnAddressToOffset(components.startColumn) + 1;

	if (overwriteMaxRowsPerChunk !== null && overwriteMaxRowsPerChunk < 1) {
		throw new InvalidArgumentError("overwriteRowsPerRequest must be greater than 0");
	}
	const columnCount = countAddressColumns(address);

	const rowsPerRequest = overwriteMaxRowsPerChunk ?? Math.floor(maxCellsPerRequest / columnsPerRow);

	const rangeStartRowOffset = rowAddressToOffset(components.startRow);
	const rangeEndRowOffset = rowAddressToOffset(components.endRow);

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
		const numberFormat = range.numberFormat as CellFormat[][];
		const rowCount = values.length;

		for (let r = 0; r < rowCount; r++) {
			const row = Array.from(
				{ length: columnCount },
				(_, c) =>
					({
						text: text[r]?.[c] ?? ("" as CellText),
						value: values[r]?.[c] ?? "",
						format: numberFormat?.[r]?.[c] ?? ("" as CellFormat),
						style: emptyStyle,
					}) satisfies Cell,
			);

			yield row;
		}
	}
}
