/**
 * Insert a new blank range at a specified address, shifting existing cells.
 * @module insertWorkbookCells
 * @category Operations
 */

import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import ProtocolError from "../../errors/ProtocolError.ts";
import { operation } from "../../graphApi.ts";
import type { Address, CellRangeAddress } from "../../models/Address.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.ts";
import { normalizeAddress } from "../../services/addressManipulation.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";

/**
 * Insert a new blank range at a specified address, shifting existing cells.
 * @param worksheetRef Reference to the worksheet where the range will be inserted.
 * @param address Address where the new range will be inserted.
 * @param shift Direction to shift existing cells. Can be "Down" or "Right".
 * @returns Newly inserted range.
 * @remarks This only inserts a new blank range at the specified address. To set content in the new range, use `updateWorkbookRange` afterward.
 * @see https://learn.microsoft.com/en-us/graph/api/range-insert
 */
export default function insertWorkbookCells(worksheetRef: WorkbookWorksheetRef, address: Address, shift: "Down" | "Right"): GraphOperation<WorkbookRange & WorkbookRangeRef> {
	return operation({
		context: worksheetRef.context,
		method: "POST",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${normalizeAddress(address)}')/insert`, worksheetRef),
		headers: {
			"workbook-session-id": worksheetRef.sessionId,
			"content-type": "application/json",
		},
		body: {
			shift,
		},
		responseTransform: (response) => {
			const workbook = response as WorkbookRange;
			if (!workbook.address) {
				throw new ProtocolError("Invalid response: address is missing");
			}
			const rangeRef = createWorkbookRangeRef(worksheetRef, workbook.address as CellRangeAddress);
			return {
				...workbook,
				...rangeRef,
			};
		},
	});
}
