import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import type { WorkbookRangeRef } from "../../model/WorkbookRangeRef.js";
import generatePath from "../../utils/generatePath.js";

/** Delete a range. @see https://learn.microsoft.com/en-us/graph/api/range-clear */
export default function deleteWorkbookRange(rangeRef: WorkbookRangeRef, shift: "Up" | "Left", opts?: GraphOptions): GraphOperation<void> {
    return {
        method: "POST",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')/delete`, rangeRef),
        headers: {
            'workbook-session-id': rangeRef.sessionId,
            'content-type': 'application/json',
        },
        body: {
            shift
        },
        dependsOn: opts?.dependsOn,
    };
}
