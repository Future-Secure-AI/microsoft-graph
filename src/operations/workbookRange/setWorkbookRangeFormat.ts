// PATCH /sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')/format
// https://learn.microsoft.com/en-us/graph/api/rangeformat-update

import type { WorkbookRangeFormat } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Update the general format of a workbook range.
 *
 * @param rangeRef - A reference to the range to be formatted, optionally including session information.
 * @param format - The general format properties to apply to the range.
 * @see https://learn.microsoft.com/en-us/graph/api/rangeformat-update
 */
export default function setWorkbookRangeFormat(rangeRef: WorkbookRangeRef, format: WorkbookRangeFormat): GraphOperation<void> {
	const address = normalizeAddress(rangeRef.address, true);

	return operation({
		contextId: rangeRef.contextId,
		method: "PATCH",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')/format`, rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
			"content-type": "application/json",
		},
		body: format,
		responseTransform: () => undefined,
	});
}

// /format/font > WorkbookChartFont
