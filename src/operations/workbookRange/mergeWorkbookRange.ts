/**
 * Merge a range of cells in a worksheet.
 * @module mergeWorkbookRange
 * @category Operations
 */

import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRange.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Merge a range of cells in a worksheet.
 * @param rangeRef Reference to the worksheet range.
 * @param across If true, merge cells in each row of the specified range as separate merged cells. If false or omitted, merge all cells in the range into a single cell.
 * @returns The merged range.
 * @see https://learn.microsoft.com/en-us/graph/api/range-merge
 */
export default function mergeWorkbookRange(rangeRef: WorkbookRangeRef, across = false): GraphOperation<void> {
	return operation({
		context: rangeRef.context,
		method: "POST",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${normalizeAddress(rangeRef.address)}')/merge`, rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
			"content-type": "application/json",
		},
		body: {
			...(across !== undefined ? { across } : {}),
		},
		responseTransform: () => undefined,
	});
}
