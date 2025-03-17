import type { WorkbookRange } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { GraphOptions } from "../../models/GraphOptions.js";
import type { WorkbookNamedRangeRef } from "../../models/WorkbookNamedRangeRef.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Update range that has been defined using the "named range" functionality. Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values. @see https://learn.microsoft.com/en-us/graph/api/range-update */
export default function updateWorkbookNamedRange(rangeRef: WorkbookNamedRangeRef, value: WorkbookRange, opts?: GraphOptions): GraphOperation<void> {
    return {
        method: "PATCH",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/names/{range-name}/range", rangeRef),
        headers: {
            'workbook-session-id': rangeRef.sessionId,
            'content-type': 'application/json',
        },
        body: value,
        dependsOn: opts?.dependsOn,
    };
}
