/**
 * Retrieve a named range.
 * @module getWorkbookNamedRange
 * @category Operations
 */

import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookNamedRangeRef } from "../../models/WorkbookNamedRangeRef.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Retrieve a named range.
 * @param rangeRef Reference to the named range.
 * @returns Specified named range.
 * @see https://learn.microsoft.com/en-us/graph/api/range-get
 */
export default function getWorkbookNamedRange(rangeRef: WorkbookNamedRangeRef): GraphOperation<WorkbookRange & WorkbookNamedRangeRef> {
	return operation({
		context: rangeRef.context,
		method: "GET",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/names/{range-name}/range", rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
			const range = response as WorkbookRange;
			return {
				...range,
				...rangeRef,
			};
		},
	});
}
