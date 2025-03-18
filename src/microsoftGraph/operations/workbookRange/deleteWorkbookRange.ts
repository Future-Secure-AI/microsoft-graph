import type { GraphOperation } from "../../models/GraphOperation.js";
import type { GraphOptions } from "../../models/GraphOptions.js";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.js";
import { jsonContentType } from "../../services/contentTypes.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Delete a range. @see https://learn.microsoft.com/en-us/graph/api/range-clear */
export default function deleteWorkbookRange(rangeRef: WorkbookRangeRef, shift: "Up" | "Left", opts?: GraphOptions): GraphOperation<void> {
    return {
        method: "POST",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')/delete", rangeRef),
        headers: {
            "workbook-session-id": rangeRef.sessionId,
            "content-type": jsonContentType,
        },
        body: {
            shift
        },
        dependsOn: opts?.dependsOn,
    };
}
