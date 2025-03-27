import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookNamedRangeRef } from "../../models/WorkbookNamedRangeRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Retrieve range that has been defined using the "named range" functionality. @see https://learn.microsoft.com/en-us/graph/api/range-get */
export default function getWorkbookNamedRange(rangeRef: WorkbookNamedRangeRef): GraphOperation<WorkbookRange & WorkbookNamedRangeRef> {
    return operation({
        contextId: rangeRef.contextId,
        method: "GET",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/names/{range-name}/range", rangeRef),
        headers: {
            "workbook-session-id": rangeRef.sessionId,
        },
        body: null,
        responseTransform: response => {
            const range = response as WorkbookRange;
            return {
                ...range,
                ...rangeRef
            }
        }
    });
}
