/**
 * Unmerge a merged range of cells in a worksheet.
 * @module unmergeWorkbookRange
 * @category Operations
 */

import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRange.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Unmerge a merged range of cells in a worksheet.
 * @param rangeRef Reference to the worksheet range.
 *  * @see https://learn.microsoft.com/en-us/graph/api/range-unmerge
 */
export default function unmergeWorkbookRange(rangeRef: WorkbookRangeRef): GraphOperation<void> {
	return operation({
		context: rangeRef.context,
		method: "POST",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${normalizeAddress(rangeRef.address)}')/unmerge`, rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
			"content-type": "application/json",
		},
		body: null,
		responseTransform: () => undefined,
	});
}
