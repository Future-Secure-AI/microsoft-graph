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
import { createWorkbookRangeRef } from "../services/workbookRange.ts";
import { maxCellsPerRequest } from "../services/batch.ts";

/**
 * Iterates over the values of a workbook range in chunks, fetching data in manageable sizes.
 *
 * @param rangeRef - A reference to the workbook range to iterate over.
 * @param overwriteMaxRowsPerChunk - Optional. The number of rows to fetch per request. If omitted, it is automatically calculated.
 * @returns An async iterable that yields rows of range values.
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
		const numberFormat = range.numberFormat as NumberFormat[][];
		const rowCount = values.length;

		for (let r = 0; r < rowCount; r++) {
			const row = Array.from({ length: columnCount }, (_, c) => ({
				text: text[r]?.[c] ?? ("" as CellText),
				value: values[r]?.[c] ?? "",
				numberFormat: numberFormat?.[r]?.[c] ?? ("" as NumberFormat),
			}));

			yield row;
		}
	}
}
