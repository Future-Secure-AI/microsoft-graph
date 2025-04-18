// https://learn.microsoft.com/en-us/graph/api/rangefont-get

import type { WorkbookRangeFont } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Retrieve the font format of a workbook range.
 *
 * @param rangeRef - A reference to the range, optionally including session information.
 * @returns The font format of the specified range, including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/rangefont-get
 */
export default function getWorkbookRangeFont(rangeRef: WorkbookRangeRef): GraphOperation<WorkbookRangeFont & WorkbookRangeRef> {
	return operation({
		contextId: rangeRef.contextId,
		method: "GET",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${rangeRef.address}')/format/font`, rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
			const font = response as WorkbookRangeFont;
			return {
				...font,
				...rangeRef,
			};
		},
	});
}
