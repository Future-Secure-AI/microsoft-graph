// TODO: Rename to getWorkbookRangeValueTextFormat

/**
 * Fetch a range.
 * @module getWorkbookWorksheetRange
 * @category Operations
 */

import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRange.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Fetch a range.
 * @param rangeRef Reference to the range to be fetched.
 * @param select Optional parameters to select specific properties of the range.
 * @returns The fetched range, including values and formatting
 * @see https://learn.microsoft.com/en-us/graph/api/range-get
 */
export default function getWorkbookWorksheetRange(rangeRef: WorkbookRangeRef, select?: { values?: boolean; text?: boolean; numberFormat?: boolean }): GraphOperation<WorkbookRange & WorkbookRangeRef> {
	const address = normalizeAddress(rangeRef.address, true);

	const selectString = select
		? Object.entries(select)
				.map(([k, v]) => (v ? k : undefined))
				.filter((v) => !!v)
				.join(",")
		: "";

	return operation({
		context: rangeRef.context,
		method: "GET",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')?$select=${selectString}`, rangeRef),
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
