import type { WorkbookRange } from "../../model/Dto.js";
import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import type { WorkbookRangeRef } from "../../model/WorkbookRangeRef.js";
import generatePath from "../../utils/generatePath.js";

/** Update range, including values and formatting. Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values. @see https://learn.microsoft.com/en-us/graph/api/range-update */
export default function updateWorkbookRange(rangeRef: WorkbookRangeRef, update: WorkbookRange, opts?: GraphOptions): GraphOperation<void> {
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
