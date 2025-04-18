// https://learn.microsoft.com/en-us/graph/api/rangefill-get

import type { WorkbookRangeFill } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Retrieve the fill format of a workbook range.
 *
 * @param rangeRef - A reference to the range, optionally including session information.
 * @returns The fill format of the specified range, including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/rangefill-get
 */
export default function getWorkbookRangeFill(rangeRef: WorkbookRangeRef): GraphOperation<WorkbookRangeFill & WorkbookRangeRef> {
	return operation({
		contextId: rangeRef.contextId,
		method: "GET",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${rangeRef.address}')/format/fill`, rangeRef),
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
