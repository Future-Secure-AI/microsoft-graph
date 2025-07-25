/**
 * Update a named range.
 * @module updateWorkbookNamedRange
 * @category Operations
 */

import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookNamedRangeRef } from "../../models/WorkbookNamedRange.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Update a named range.
 * @param rangeRef Reference to the named range to be updated.
 * @param value - The updated properties for the named range.
 *  * @remarks Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values.
 * @see https://learn.microsoft.com/en-us/graph/api/range-update
 */
export default function updateWorkbookNamedRange(rangeRef: WorkbookNamedRangeRef, value: WorkbookRange): GraphOperation<void> {
	return operation({
		context: rangeRef.context,
		method: "PATCH",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/names/{range-name}/range", rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
			"content-type": "application/json",
		},
		body: value,
		responseTransform: () => undefined,
	});
}
