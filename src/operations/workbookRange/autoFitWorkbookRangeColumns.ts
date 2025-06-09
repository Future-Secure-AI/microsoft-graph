/**
 * Auto-fit the columns in a range.
 * @module autoFitWorkbookRangeColumns
 * @category Operations
 */

import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Auto-fit the columns in a range.
 * @param rangeRef Reference to the range.
 * @returns Nothing.
 * @see https://learn.microsoft.com/en-us/graph/api/rangeformat-autofitcolumns
 */
export default function autoFitWorkbookRangeColumns(rangeRef: WorkbookRangeRef): GraphOperation<void> {
	const address = normalizeAddress(rangeRef.address, true);

	return operation({
		context: rangeRef.context,
		method: "POST",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')/format/autofitcolumns`, rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
		},
		body: null,
		responseTransform: () => undefined,
	});
}
