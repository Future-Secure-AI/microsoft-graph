/**
 * Retrieve the font format of a workbook range.
 * @module getWorkbookRangeFont
 * @category Operations
 */

// https://learn.microsoft.com/en-us/graph/api/rangefont-get

import type { WorkbookRangeFont } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Retrieve the font format of a workbook range.
 * @param rangeRef Reference to the range.
 * @returns Font format of the specified range.
 * @see https://learn.microsoft.com/en-us/graph/api/rangefont-get
 */
export default function getWorkbookRangeFont(rangeRef: WorkbookRangeRef): GraphOperation<WorkbookRangeFont & WorkbookRangeRef> {
	const address = normalizeAddress(rangeRef.address, true);

	return operation({
		context: rangeRef.context,
		method: "GET",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')/format/font`, rangeRef),
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
