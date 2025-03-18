import type { GraphOperation } from "../../models/GraphOperation.js";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Clear a range - content, formatting or both. @see https://learn.microsoft.com/en-us/graph/api/range-delete */
export default function clearWorkbookRange(rangeRef: WorkbookRangeRef, applyTo: "All" | "Formats" | "Contents" = "All"): GraphOperation<void> {
    return {
        method: "POST",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')/clear", rangeRef),
        headers: {
            "workbook-session-id": rangeRef.sessionId,
            "content-type": "application/json",
        },
        body: {
            applyTo
        },
    };
}
