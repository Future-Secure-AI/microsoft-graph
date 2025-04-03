import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { RowOffset } from "../models/RowOffset.ts";
import type { RowRangeValues } from "../models/RowRangeValues.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import { composeAddress, decomposeAddress } from "../services/addressManipulation.ts";
import { columnAddressToOffset, offsetToRowAddress, rowAddressToOffset } from "../services/addressOffset.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";

/**
 * Maximum number of cells that can be retrieved in a single request, unless overwritten.
 * @remarks The Microsoft Graph API documentation does not specify a fixed maximum number of cells that can be retrieved in a single request.
 * However, it mentions that large ranges may result in errors due to resource constraints. Additionally, discussions in developer
 * communities suggest that requests exceeding 10,000 cells may encounter issues.
 */
const maxCellsPerRequest = 10_000;

/**
 * Iterates over the values of a workbook range in chunks, fetching data in manageable sizes.
 *
 * @param rangeRef - A reference to the workbook range to iterate over.
 * @param overwriteRowsPerRequest - Optional. The number of rows to fetch per request. If omitted, it is automatically calculated.
 * @returns An async iterable that yields rows of range values.
 */
export default async function* iterateWorkbookRangeValues(rangeRef: WorkbookRangeRef, overwriteRowsPerRequest: number | null = null): AsyncIterable<RowRangeValues> {
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

		const chunkStartRow = offsetToRowAddress(requestStartRowOffset);
		const chunkEndRow = offsetToRowAddress(requestEndRowOffset);

		const requestAddress = composeAddress({
			startRow: chunkStartRow,
			endRow: chunkEndRow,
			startColumn: components.startColumn,
			endColumn: components.endColumn,
		});

		const requestRef = createWorkbookRangeRef(rangeRef, requestAddress);

		const range = await getWorkbookWorksheetRange(requestRef);

		for (const row of range.values) {
			yield row as RowRangeValues;
		}
	}
}
