import type { WorkbookRangeFormat } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Retrieve the format of a workbook range.
 *
 * @param rangeRef - A reference to the range, optionally including session information.
 * @returns The format of the specified range, including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/rangeformat-get
 */
export default function getWorkbookRangeFormat(rangeRef: WorkbookRangeRef): GraphOperation<WorkbookRangeFormat & WorkbookRangeRef> {
	const address = normalizeAddress(rangeRef.address);

	return operation({
		contextId: rangeRef.contextId,
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
