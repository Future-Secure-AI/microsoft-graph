import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Delete a range.
 *
 * @param rangeRef - A reference to the range to be deleted, optionally including session information.
 * @param shift - The direction to shift existing cells after deletion. Can be "Up" or "Left".
 * @returns Nothing.
 * @see https://learn.microsoft.com/en-us/graph/api/range-clear
 */
export default function deleteWorkbookRange(rangeRef: WorkbookRangeRef, shift: "Up" | "Left"): GraphOperation<void> {
	return operation({
		contextId: rangeRef.contextId,
		method: "POST",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')/delete", rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
			"content-type": "application/json",
		},
		body: {
			shift,
		},
		responseTransform: () => undefined,
	});
}
