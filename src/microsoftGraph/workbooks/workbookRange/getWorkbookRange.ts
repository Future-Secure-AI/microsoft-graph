import { type GraphRequest, generatePath } from "../../api.js";
import type { WorkbookRange } from "../../models.js";
import type { WorkbookRangeRef } from "./WorkbookRangeRef.js";

/** Fetch a range, including values and formatting. @see https://learn.microsoft.com/en-us/graph/api/range-get */
export default function getWorkbookRange(rangeRef: WorkbookRangeRef): GraphRequest<WorkbookRange> {
    return {
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')`, rangeRef),
        headers: {
            'workbook-session-id': rangeRef.sessionId,
        },
        body: null
    };
}