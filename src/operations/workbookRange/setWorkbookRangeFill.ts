/**
 * Update the fill format of a workbook range.
 * @module setWorkbookRangeFill
 * @category Operations
 */

import type { WorkbookRangeFill } from "@microsoft/microsoft-graph-types";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRange.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Update the fill format of a workbook range.
 * @param rangeRef Reference to the range to be formatted.
 * @param format Fill format properties to apply to the range.
 * @see https://learn.microsoft.com/en-us/graph/api/rangefill-update
 */
export default function setWorkbookRangeFill(rangeRef: WorkbookRangeRef, format: WorkbookRangeFill): GraphOperation<void> {
	const address = normalizeAddress(rangeRef.address, true);

	return operation({
		context: rangeRef.context,
		method: "PATCH",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')/format/fill`, rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
			"content-type": "application/json",
		},
		body: format,
		responseTransform: () => undefined,
	});
}
