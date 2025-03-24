import { operation } from "../../graphApi.ts";
import type { WorkbookRange } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeAddressUnderlying } from "../../models/WorkbookRangeAddress.ts";
import type { WorkbookTableRef } from "../../models/WorkbookTableRef.ts";
import type { WorkbookWorksheetRangeRef } from "../../models/WorkbookWorksheetRangeRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { workbookWorksheetRangeRef } from "../../services/workbookWorksheetRange.ts";

/** Retrieve the data body range of a table. @see https://learn.microsoft.com/en-us/graph/api/table-databodyrange */
export default function getWorkbookTableBodyRange(tableRef: WorkbookTableRef): GraphOperation<WorkbookRange & WorkbookWorksheetRangeRef> {
    return operation({
        method: "GET",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/tables/{table-id}/dataBodyRange", tableRef),
        headers: {
            "workbook-session-id": tableRef.sessionId,
        },
        body: null,
        responseTransform: response => {
            const range = response as WorkbookRange;
            const rangeRef = workbookWorksheetRangeRef(tableRef, range.address as WorkbookRangeAddressUnderlying);

            return {
                ...range,
                ...rangeRef
            };
        }
    });
}