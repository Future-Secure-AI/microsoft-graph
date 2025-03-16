import { generatePath, type GraphRequest } from "../api.js";
import type { WorkbookRange } from "../models.js";
import type { WorkbookNamedRangeRef } from "./WorkbookNamedRangeRef.js";

/** Retrieve range that has been defined using the "named range" functionality. @see https://learn.microsoft.com/en-us/graph/api/range-get */
export default function getNamedRange(rangeRef: WorkbookNamedRangeRef): GraphRequest<WorkbookRange> {
    return {
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/names/{range-name}/range`, rangeRef),
        headers: {
            'workbook-session-id': rangeRef.sessionId,
        },
        body: null
    };
}
