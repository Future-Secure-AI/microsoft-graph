/**
 * Retrieve the fill format of a workbook range.
 * @module getWorkbookRangeFill
 * @category Operations
 */

// https://learn.microsoft.com/en-us/graph/api/rangefill-get

import type { WorkbookRangeFill } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Retrieve the fill format of a workbook range.
 * @param rangeRef Reference to the range.
 * @returns Fill format of the specified range.
 * @see https://learn.microsoft.com/en-us/graph/api/rangefill-get
 */
export default function getWorkbookRangeFill(rangeRef: WorkbookRangeRef): GraphOperation<WorkbookRangeFill & WorkbookRangeRef> {
	const address = normalizeAddress(rangeRef.address, true);

	return operation({
		context: rangeRef.context,
		method: "GET",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')/format/fill`, rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
			const fill = response as WorkbookRangeFill;
			return {
				...fill,
				...rangeRef,
			};
		},
	});
}
