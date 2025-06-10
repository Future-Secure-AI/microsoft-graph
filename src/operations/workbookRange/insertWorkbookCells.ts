/**
 * Insert a new blank range at a specified address, shifting existing cells.
 * @module insertWorkbookCells
 * @category Operations
 */

import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import type { CellRangeAddress } from "../../models/Address.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";

/**
 * Insert a new blank range at a specified address, shifting existing cells.
 * @param rangeRef Reference to the worksheet range where the range will be inserted.
 * @param shift Direction to shift existing cells. Can be "Down" or "Right".
 * @returns Newly inserted range.
 * @remarks This only inserts a new blank range at the specified address. To set content in the new range, use `updateWorkbookRange` afterward.
 * @see https://learn.microsoft.com/en-us/graph/api/range-insert
 */
export default function insertWorkbookCells(rangeRef: WorkbookRangeRef, shift: "Down" | "Right"): GraphOperation<WorkbookRange & WorkbookRangeRef> {
	const address = normalizeAddress(rangeRef.address);
	return operation({
		context: rangeRef.context,
		method: "POST",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')/insert`, rangeRef),
		headers: {
			"workbook-session-id": rangeRef.sessionId,
			"content-type": "application/json",
		},
		body: {
			shift,
		},
		responseTransform: (response) => {
			const workbook = response as WorkbookRange;
			const newRangeRef = createWorkbookRangeRef(rangeRef, workbook.address as CellRangeAddress);
			return {
				...workbook,
				...newRangeRef,
			};
		},
	});
}
