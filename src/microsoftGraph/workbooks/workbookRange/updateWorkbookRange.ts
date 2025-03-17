import type { GraphOptions } from "../../GraphOptions.js";
import type { GraphRequest } from "../../GraphRequest.js";
import type { WorkbookRange } from "../../models.js";
import generatePath from "../../utils/generatePath.js";
import type { WorkbookRangeRef } from "./WorkbookRangeRef.js";

/** Update range, including values and formatting. Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values. @see https://learn.microsoft.com/en-us/graph/api/range-update */
export default function updateWorkbookRange(rangeRef: WorkbookRangeRef, update: WorkbookRange, opts?: GraphOptions): GraphRequest<void> {
    return {
        method: "PATCH",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')`, rangeRef),
        headers: {
            'workbook-session-id': rangeRef.sessionId,
            'content-type': 'application/json',
        },
        body: update,
        dependsOn: opts?.dependsOn,
    };
}
