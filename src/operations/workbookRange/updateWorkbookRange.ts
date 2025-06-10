/**
 * Update a range, including values and formatting.
 * @module updateWorkbookRange
 * @category Operations
 */

import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRange.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Update a range.
 *
 * @param rangeRef Reference to the range to be updated.
 * @param update - The updated properties for the range.
 * @returns The updated range.
 * @remarks Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values.
 * @see https://learn.microsoft.com/en-us/graph/api/range-update
 */
export default function updateWorkbookRange(rangeRef: WorkbookRangeRef, update: WorkbookRange): GraphOperation<WorkbookRange & WorkbookRangeRef> {
	const address = normalizeAddress(rangeRef.address, true);

	return operation({
		context: rangeRef.context,
		method: "PATCH",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')`, rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
			"content-type": "application/json",
		},
		body: update,
		responseTransform: (response) => {
			const range = response as WorkbookRange;

			return {
				...range,
				...rangeRef,
			};
		},
	});
}
