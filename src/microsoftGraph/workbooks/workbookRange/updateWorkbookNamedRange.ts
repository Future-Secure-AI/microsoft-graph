import { type GraphRequest, generatePath } from "../../api.js";
import type { WorkbookRange } from "../../models.js";
import type { WorkbookNamedRangeRef } from "./WorkbookNamedRangeRef.js";

/** Update range that has been defined using the "named range" functionality. Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values. @see https://learn.microsoft.com/en-us/graph/api/range-update */
export default function updateWorkbookNamedRange(rangeRef: WorkbookNamedRangeRef, value: WorkbookRange): GraphRequest<void> {
    return {
        method: "PATCH",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/names/{range-name}/range`, rangeRef),
        headers: {
            'workbook-session-id': rangeRef.sessionId,
            'content-type': 'application/json',
        },
        body: value
    };
}
