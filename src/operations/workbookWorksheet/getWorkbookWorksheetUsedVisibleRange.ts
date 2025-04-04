import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { CellRangeAddress } from "../../models/Address.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";

/**
 * Retrieve the visible (not hidden) range in a worksheet.
 *
 * @param worksheetRef - A reference to the worksheet, optionally including session information.
 * @returns The visible range of the worksheet, including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/range-usedrange
 */
export default function getWorkbookWorksheetUsedVisibleRange(worksheetRef: WorkbookWorksheetRef): GraphOperation<WorkbookRange & WorkbookRangeRef> {
	return operation({
		contextId: worksheetRef.contextId,
		method: "GET",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range/usedRange/visibleView", worksheetRef),
		headers: {
			"workbook-session-id": worksheetRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
			const range = response as WorkbookRange;
			const rangeRef = createWorkbookRangeRef(worksheetRef, range.address as CellRangeAddress);

			return {
				...range,
				...rangeRef,
			};
		},
	});
}
