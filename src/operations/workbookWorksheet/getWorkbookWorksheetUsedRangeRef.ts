import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import ProtocolError from "../../errors/ProtocolError.ts";
import { operation } from "../../graphApi.ts";
import type { CellRangeAddress } from "../../models/Address.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";

/**
 * Retrieve the address of the used range in a worksheet, ignoring trailing rows and columns that are blank.
 *
 * @param worksheetRef - A reference to the worksheet, optionally including session information.
 * @returns Address of the used range of the worksheet.
 * @see https://learn.microsoft.com/en-us/graph/api/range-usedrange
 */
export default function getWorkbookWorksheetUsedRangeRef(worksheetRef: WorkbookWorksheetRef): GraphOperation<WorkbookRangeRef> {
	return operation({
		contextId: worksheetRef.contextId,
		method: "GET",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range/usedRange?$select=address", worksheetRef),
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

			return rangeRef;
		},
	});
}
