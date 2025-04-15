import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Autofit the columns in a range.
 *
 * @param rangeRef - A reference to the range, optionally including session information.
 * @returns Nothing.
 * @see https://learn.microsoft.com/en-us/graph/api/rangeformat-autofitcolumns
 */
export default function autoFitWorkbookRangeColumns(rangeRef: WorkbookRangeRef): GraphOperation<void> {
	return operation({
		contextId: rangeRef.contextId,
		method: "POST",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')/format/autofitcolumns", rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
		},
		body: null,
		responseTransform: () => undefined,
	});
}
