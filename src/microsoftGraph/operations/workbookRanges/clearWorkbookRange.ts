import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import type { WorkbookRangeRef } from "../../model/WorkbookRangeRef.js";
import generatePath from "../../utils/generatePath.js";

/** Clear a range - content, formatting or both. @see https://learn.microsoft.com/en-us/graph/api/range-delete */
export default function clearWorkbookRange(rangeRef: WorkbookRangeRef, applyTo: "All" | "Formats" | "Contents" = "All", opts?: GraphOptions): GraphOperation<void> {
    return {
        method: "POST",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')/clear`, rangeRef),
        headers: {
            'workbook-session-id': rangeRef.sessionId,
            "content-type": "application/json",
        },
        body: {
            applyTo
        },
        dependsOn: opts?.dependsOn,
    };
}
