import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { CellValue } from "../models/CellValue.ts";
import type { RowOffset } from "../models/RowOffset.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import { composeAddress, decomposeAddress } from "../services/addressManipulation.ts";
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
 */
export default async function* iterateWorkbookRangeValues(rangeRef: WorkbookRangeRef, overwriteRowsPerRequest: number | null = null): AsyncIterable<CellValue[]> {
	const address = rangeRef.address;
	const components = decomposeAddress(address);
	const columnsPerRow = columnAddressToOffset(components.endColumn) - columnAddressToOffset(components.startColumn) + 1;

	if (overwriteRowsPerRequest !== null && overwriteRowsPerRequest < 1) {
		throw new InvalidArgumentError("overwriteRowsPerRequest must be greater than 0");
	}

	const rowsPerRequest = overwriteRowsPerRequest ?? Math.floor(maxCellsPerRequest / columnsPerRow);

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

		for (const row of range.values) {
			yield row satisfies CellValue[];
		}
	}
}
