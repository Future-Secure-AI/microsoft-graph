/**
 * Update a specific border of a workbook range.
 * @module setWorkbookRangeBorder
 * @category Operations
 */

import type { WorkbookRangeBorder } from "@microsoft/microsoft-graph-types";
import type { Border, BorderSide } from "../../models/Border.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRange.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Update a specific border of a workbook range.
 * @param rangeRef Reference to the range whose border will be updated.
 * @param side The border side to update (e.g., "EdgeTop", "EdgeBottom", "EdgeLeft", "EdgeRight", "InsideHorizontal", "InsideVertical").
 * @param values Partial border object to update (color, style, weight, etc.).
 * @returns The updated border for the specified range and side.
 * @see https://learn.microsoft.com/en-us/graph/api/rangeborder-update
 */
export default function setWorkbookRangeBorder(rangeRef: WorkbookRangeRef, side: BorderSide, values: Partial<Border>): GraphOperation<WorkbookRangeBorder & WorkbookRangeRef> {
	const address = normalizeAddress(rangeRef.address, true);
	return operation({
		context: rangeRef.context,
		method: "PATCH",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')/format/borders/${side}`, rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
			"content-type": "application/json",
		},
		body: {
			sideIndex: side,
			color: values.color,
			style: values.style,
			weight: values.weight,
		},
		responseTransform: (response) => {
			const updated = response as WorkbookRangeBorder;
			return {
				...updated,
				...rangeRef,
			};
		},
	});
}
