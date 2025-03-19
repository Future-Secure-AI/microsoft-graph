import type { WorkbookRange } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { WorkbookWorksheetRangeRef } from "../../models/WorkbookWorksheetRangeRef.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Fetch a range, including values and formatting. @see https://learn.microsoft.com/en-us/graph/api/range-get */
export default function getWorkbookRange(rangeRef: WorkbookWorksheetRangeRef): GraphOperation<WorkbookRange> {
    return {
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${rangeRef.address}')`, rangeRef),
        headers: {
            "workbook-session-id": rangeRef.sessionId,
        },
        body: null,
    };
}