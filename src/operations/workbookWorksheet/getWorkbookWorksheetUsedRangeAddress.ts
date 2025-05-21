import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import ProtocolError from "../../errors/ProtocolError.ts";
import { operation } from "../../graphApi.ts";
import type { Address, CellRangeAddress } from "../../models/Address.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.ts";
import { composeAddress, decomposeAddress } from "../../services/addressManipulation.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Retrieve the address of the used range in a worksheet, ignoring trailing rows and columns that are blank.
 *
 * @param worksheetRef - A reference to the worksheet, optionally including session information.
 * @returns Address of the used range of the worksheet.
 * @see https://learn.microsoft.com/en-us/graph/api/range-usedrange
 */
export default function getWorkbookWorksheetUsedRangeAddress(worksheetRef: WorkbookWorksheetRef): GraphOperation<Address> {
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

			const address = composeAddress(decomposeAddress(range.address as CellRangeAddress)); // Strip any prefixed sheet name
			return address;
		},
	});
}
