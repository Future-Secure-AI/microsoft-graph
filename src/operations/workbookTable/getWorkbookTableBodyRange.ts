/**
 * Retrieve the data body range of a workbook table.
 * @module getWorkbookTableBodyRange
 * @category Operations
 */

import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import ProtocolError from "../../errors/ProtocolError.ts";
import type { CellRangeAddress } from "../../models/Address.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRange.ts";
import type { WorkbookTableRef } from "../../models/WorkbookTable.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";

/**
 * Retrieve the data body range of a workbook table.
 * @param tableRef Reference to the table.
 * @returns Data body range of the specified table.
 * @see https://learn.microsoft.com/en-us/graph/api/table-databodyrange
 */
export default function getWorkbookTableBodyRange(tableRef: WorkbookTableRef): GraphOperation<WorkbookRange & WorkbookRangeRef> {
	return operation({
		context: tableRef.context,
		method: "GET",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/tables/{table-id}/dataBodyRange", tableRef),
		headers: {
			"workbook-session-id": tableRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
			const range = response as WorkbookRange;
			if (!range.address) {
				throw new ProtocolError("Invalid response: address is missing");
			}
			const rangeRef = createWorkbookRangeRef(tableRef, range.address as CellRangeAddress);

			return {
				...range,
				...rangeRef,
			};
		},
	});
}
