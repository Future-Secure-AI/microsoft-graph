
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Clear a range - content, formatting or both. @see https://learn.microsoft.com/en-us/graph/api/range-delete */
export default function clearWorkbookRange(rangeRef: WorkbookRangeRef, applyTo: "All" | "Formats" | "Contents" = "All"): GraphOperation<void> {
    return operation({
        contextId: rangeRef.contextId,
        method: "POST",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')/clear", rangeRef),
        headers: {
            "workbook-session-id": rangeRef.sessionId,
            "content-type": "application/json",
        },
        body: {
            applyTo
        },
        responseTransform: () => undefined
    });
}
