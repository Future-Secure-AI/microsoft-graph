import type { WorkbookRangeFont } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Update the font format of a workbook range.
 *
 * @param rangeRef - A reference to the range to be formatted, optionally including session information.
 * @param format - The font format properties to apply to the range.
 * @see https://learn.microsoft.com/en-us/graph/api/rangefont-update
 */
export default function setWorkbookRangeFont(rangeRef: WorkbookRangeRef, format: WorkbookRangeFont): GraphOperation<void> {
	return operation({
		contextId: rangeRef.contextId,
		method: "PATCH",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')/format/font", rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
			"content-type": "application/json",
		},
		body: format,
		responseTransform: () => undefined,
	});
}
