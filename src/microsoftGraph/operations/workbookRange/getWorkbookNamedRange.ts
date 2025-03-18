import type { WorkbookRange } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { GraphOptions } from "../../models/GraphOptions.js";
import type { WorkbookNamedRangeRef } from "../../models/WorkbookNamedRangeRef.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Retrieve range that has been defined using the "named range" functionality. @see https://learn.microsoft.com/en-us/graph/api/range-get */
export default function getWorkbookNamedRange(rangeRef: WorkbookNamedRangeRef, opts?: GraphOptions): GraphOperation<WorkbookRange> {
    return {
        method: "GET",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/names/{range-name}/range", rangeRef),
        headers: {
            "workbook-session-id": rangeRef.sessionId,
        },
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
