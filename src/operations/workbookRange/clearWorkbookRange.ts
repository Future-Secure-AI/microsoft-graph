/**
 * Clear a range - content, formatting, or both.
 * @module clearWorkbookRange
 * @category Operations
 */

import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRange.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Clear a range - content, formatting, or both.
 * @param rangeRef Reference to the range to be cleared.
 * @param applyTo What to clear - "All", "Formats", or "Contents".
 *  * @see https://learn.microsoft.com/en-us/graph/api/range-delete
 */
export default function clearWorkbookRange(rangeRef: WorkbookRangeRef, applyTo: "All" | "Formats" | "Contents" = "All"): GraphOperation<void> {
	const address = normalizeAddress(rangeRef.address, true);

	return operation({
		context: rangeRef.context,
		method: "POST",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')/clear`, rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
			"content-type": "application/json",
		},
		body: {
			applyTo,
		},
		responseTransform: () => undefined,
	});
}
