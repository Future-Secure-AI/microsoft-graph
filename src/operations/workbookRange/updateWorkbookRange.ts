import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Update a range, including values and formatting. Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values.
 *
 * @param rangeRef - A reference to the range to be updated, optionally including session information.
 * @param update - The updated properties for the range.
 * @returns The updated range, including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/range-update
 */
export default function updateWorkbookRange(rangeRef: WorkbookRangeRef, update: WorkbookRange): GraphOperation<WorkbookRange & WorkbookRangeRef> {
	const address = normalizeAddress(rangeRef.address);

	return operation({
		contextId: rangeRef.contextId,
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
