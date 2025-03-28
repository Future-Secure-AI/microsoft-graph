import type { WorkbookRangeView } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Retrieve the visible view of a range. @see https://learn.microsoft.com/en-us/graph/api/workbookrange-visibleview */
export default function getWorkbookVisibleRange(rangeRef: WorkbookRangeRef): GraphOperation<WorkbookRangeView & WorkbookRangeRef> {
	// TODO: Should be a visible ref type?
	return operation({
		contextId: rangeRef.contextId,
		method: "GET",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${rangeRef.address}')/visibleView`, rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
			const range = response as WorkbookRangeView;

			return {
				...range,
				...rangeRef,
			};
		},
	});
}
