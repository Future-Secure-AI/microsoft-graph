import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeAddressUnderlying } from "../../models/WorkbookRangeAddress.ts";
import type { WorkbookTableRef } from "../../models/WorkbookTableRef.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookWorksheetRangeRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { workbookRangeRef } from "../../services/workbookRange.ts";

/** Retrieve the header row range of a table. @see https://learn.microsoft.com/en-us/graph/api/table-headerrowrange */
export default function getWorkbookTableHeaderRange(tableRef: WorkbookTableRef): GraphOperation<WorkbookRange & WorkbookRangeRef> {
    return operation({
        method: "GET",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/tables/{table-id}/headerRowRange", tableRef),
        headers: {
            "workbook-session-id": tableRef.sessionId,
        },
        body: null,
        responseTransform: response => {
            const range = response as WorkbookRange;
            const rangeRef = workbookRangeRef(tableRef, range.address as WorkbookRangeAddressUnderlying);

            return {
                ...range,
                ...rangeRef
            };
        }
    });
}