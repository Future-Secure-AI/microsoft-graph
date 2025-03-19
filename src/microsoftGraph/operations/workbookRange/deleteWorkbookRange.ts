import type { GraphOperation } from "../../models/GraphOperation.js";
import type { WorkbookWorksheetRangeRef } from "../../models/WorkbookWorksheetRangeRef.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Delete a range. @see https://learn.microsoft.com/en-us/graph/api/range-clear */
export default function deleteWorkbookRange(rangeRef: WorkbookWorksheetRangeRef, shift: "Up" | "Left"): GraphOperation<void> {
    return {
        method: "POST",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')/delete", rangeRef),
        headers: {
            "workbook-session-id": rangeRef.sessionId,
            "content-type": "application/json",
        },
        body: {
            shift
        },
    };
}
