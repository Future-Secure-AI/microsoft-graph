import { operation } from "../../graphApi.ts";
import type { WorkbookTable } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookWorksheetRangeRef } from "../../models/WorkbookWorksheetRangeRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Create a new table in a worksheet. @see https://learn.microsoft.com/en-us/graph/api/worksheet-post-tables */
export default function createWorkbookTable(rangeRef: WorkbookWorksheetRangeRef, hasHeaders: boolean): GraphOperation<WorkbookTable> {
    return operation({
        method: "POST",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/tables/add", rangeRef),
        headers: {
            "workbook-session-id": rangeRef.sessionId,
            "content-type": "application/json",
        },
        body: {
            address: rangeRef.address,
            hasHeaders
        },
    });
}
