import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { RangeAddressUnderlying } from "../../models/RangeAddress.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import type { WorkbookTableRef } from "../../models/WorkbookTableRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";

/** Retrieve the data body range of a table. @see https://learn.microsoft.com/en-us/graph/api/table-databodyrange */
export default function getWorkbookTableBodyRange(tableRef: WorkbookTableRef): GraphOperation<WorkbookRange & WorkbookRangeRef> {
	return operation({
		contextId: tableRef.contextId,
		method: "GET",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/tables/{table-id}/dataBodyRange", tableRef),
		headers: {
			"workbook-session-id": tableRef.sessionId,
		},
		body: null,
		responseTransform: (response) => {
			const range = response as WorkbookRange;
			const rangeRef = createWorkbookRangeRef(tableRef, range.address as RangeAddressUnderlying);

			return {
				...range,
				...rangeRef,
			};
		},
	});
}
