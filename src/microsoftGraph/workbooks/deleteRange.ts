import { generatePath, type GraphRequest } from "../api.js";
import type { WorkbookRangeRef } from "./WorkbookRangeRef.js";

/** Delete a range. @see https://learn.microsoft.com/en-us/graph/api/range-clear */
export default function deleteRange(rangeRef: WorkbookRangeRef, shift: "Up" | "Left"): GraphRequest<void> {
    return {
        method: "POST",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')/delete`, rangeRef),
        headers: {
            'workbook-session-id': rangeRef.sessionId,
            'content-type': 'application/json',
        },
        body: {
            shift
        }
    };
}
