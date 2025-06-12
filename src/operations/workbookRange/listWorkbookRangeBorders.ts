/**
 * List the borders of a range.
 * @module listWorkbookRangeBorders
 * @category Operations
 */

import type { WorkbookRangeBorder } from "@microsoft/microsoft-graph-types";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRange.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * List the borders of a range.
 * @param rangeRef Reference to the range whose borders will be listed.
 * @returns Array of borders for the specified range.
 * @see https://learn.microsoft.com/en-us/graph/api/rangeborder-list
 */
export default function listWorkbookRangeBorders(rangeRef: WorkbookRangeRef): GraphOperation<WorkbookRangeBorder[]> {
	const address = normalizeAddress(rangeRef.address, true);
	return operation({
		context: rangeRef.context,
		method: "GET",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')/format/borders`, rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
            const typed = response as { value: WorkbookRangeBorder[] };
			return typed.value;
		},
	});
}
