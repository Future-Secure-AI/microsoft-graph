import { operation } from "../../graphApi.ts";
import type { WorkbookRange } from "../../models/Dto.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookWorksheetRangeRef } from "../../models/WorkbookWorksheetRangeRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Fetch a range, including values and formatting. @see https://learn.microsoft.com/en-us/graph/api/range-get */
export default function getWorkbookRange(rangeRef: WorkbookWorksheetRangeRef): GraphOperation<WorkbookRange> {
    return operation({
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${rangeRef.address}')`, rangeRef),
        headers: {
            "workbook-session-id": rangeRef.sessionId,
        },
        body: null,
        responseTransform: response => response as WorkbookRange
    });
}