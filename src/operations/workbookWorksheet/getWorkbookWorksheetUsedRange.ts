/**
 * Retrieve the used range in a worksheet, ignoring trailing rows and columns that are blank.
 * @module getWorkbookWorksheetUsedRange
 * @category Operations
 */

import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import ProtocolError from "../../errors/ProtocolError.ts";
import type { CellRangeAddress } from "../../models/Address.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";

/**
 * Retrieve the used range in a worksheet, ignoring trailing rows and columns that are blank.
 * @param worksheetRef Reference to the worksheet.
 * @returns Used range of the worksheet.
 * @see https://learn.microsoft.com/en-us/graph/api/range-usedrange
 */
export default function getWorkbookWorksheetUsedRange(worksheetRef: WorkbookWorksheetRef): GraphOperation<WorkbookRange & WorkbookRangeRef> {
	return operation({
		context: worksheetRef.context,
		method: "GET",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range/usedRange", worksheetRef),
		headers: {
			"workbook-session-id": worksheetRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
			const range = response as WorkbookRange;
			if (!range.address) {
				throw new ProtocolError("Invalid response: address is missing");
			}
			const rangeRef = createWorkbookRangeRef(worksheetRef, range.address as CellRangeAddress);

			return {
				...range,
				...rangeRef,
			};
		},
	});
}
