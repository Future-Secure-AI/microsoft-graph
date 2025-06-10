/**
 * Retrieve the visible (not hidden) range in a worksheet.
 * @module getWorkbookWorksheetUsedVisibleRange
 * @category Operations
 */

import type { WorkbookRange, WorkbookRangeView } from "@microsoft/microsoft-graph-types";
import ProtocolError from "../../errors/ProtocolError.ts";
import type { CellRangeAddress } from "../../models/Address.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRange.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheet.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";

/**
 * Retrieve the visible (not hidden) range in a worksheet.
 * @param worksheetRef Reference to the worksheet.
 * @returns The visible range of the worksheet.
 * @see https://learn.microsoft.com/en-us/graph/api/range-usedrange
 */
export default function getWorkbookWorksheetUsedVisibleRange(worksheetRef: WorkbookWorksheetRef): GraphOperation<WorkbookRange & WorkbookRangeRef> {
	return operation({
		context: worksheetRef.context,
		method: "GET",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range/usedRange/visibleView", worksheetRef),
		headers: {
			"workbook-session-id": worksheetRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
			const range = response as WorkbookRangeView;

			const address = extractAddress(range);
			const rangeRef = createWorkbookRangeRef(worksheetRef, address as CellRangeAddress);

			return {
				...range,
				...rangeRef,
			};
		},
	});
}
function extractAddress(range: WorkbookRangeView): CellRangeAddress {
	// `range.address` is absent, so manually create the range reference
	const cellAddresses = range.cellAddresses as string[][];
	const firstRow = cellAddresses[0];
	const lastRow = cellAddresses[cellAddresses.length - 1];

	if (!(firstRow && lastRow)) {
		throw new ProtocolError("No visible cells found in the range.");
	}

	const firstCell = firstRow[0];
	const lastCell = lastRow[lastRow.length - 1];
	const address = `${firstCell}:${lastCell}` as CellRangeAddress;
	return address;
}
