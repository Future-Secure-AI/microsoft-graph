import type { RowOffset } from "../models/RowOffset.ts";
import type { RowRangeValues } from "../models/RowRangeValues.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import getWorkbookWorksheetRange from "../operations/workbookRange/getWorkbookWorksheetRange.ts";
import { composeAddress, decomposeAddress } from "../services/addressManipulation.ts";
import { offsetToRowAddress, rowAddressToOffset } from "../services/addressOffset.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";

const defaultRowsPerRequest = 1000;

export default async function* iterateWorkbookRangeValues(rangeRef: WorkbookRangeRef, rowsPerRequest = defaultRowsPerRequest): AsyncIterable<RowRangeValues> {
	const address = rangeRef.address;
	const components = decomposeAddress(address);

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
