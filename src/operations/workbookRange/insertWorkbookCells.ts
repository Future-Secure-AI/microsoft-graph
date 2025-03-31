import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import ProtocolError from "../../errors/ProtocolError.ts";
import { operation } from "../../graphApi.ts";
import type { Address, CellRangeAddress } from "../../models/Address.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";

/** Insert a new blank range at a specified address, shifting existing cells. Use `updateRange` after to set content. @see https://learn.microsoft.com/en-us/graph/api/range-insert */
export default function insertWorkbookCells(worksheetRef: WorkbookWorksheetRef, address: Address, shift: "Down" | "Right"): GraphOperation<WorkbookRange & WorkbookRangeRef> {
	return operation({
		contextId: worksheetRef.contextId,
		method: "POST",
		path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')/insert`, worksheetRef),
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
