// TODO: Rename to getWorkbookRangeAlignment
/**
 * Retrieve the format of a workbook range.
 * @module getWorkbookRangeFormat
 * @category Operations
 */

import type { WorkbookRangeFormat } from "@microsoft/microsoft-graph-types";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRange.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Retrieve the format of a workbook range.
 * @param rangeRef Reference to the range.
 * @returns Format of the specified range.
 * @see https://learn.microsoft.com/en-us/graph/api/rangeformat-get
 */
export default function getWorkbookRangeFormat(rangeRef: WorkbookRangeRef): GraphOperation<WorkbookRangeFormat & WorkbookRangeRef> {
	const address = normalizeAddress(rangeRef.address, true);

	return operation({
		context: rangeRef.context,
		method: "GET",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')/format`, rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
			const format = response as WorkbookRangeFormat;
			return {
				...format,
				...rangeRef,
			};
		},
	});
}
