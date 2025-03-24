import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookRangeRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Update range, including values and formatting. Properties that aren't included in the request maintain their previous values or are recalculated based on changes to other property values. @see https://learn.microsoft.com/en-us/graph/api/range-update */
export default function updateWorkbookRange(rangeRef: WorkbookRangeRef, update: WorkbookRange): GraphOperation<WorkbookRange & WorkbookRangeRef> {
    return operation({
        method: "PATCH",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${rangeRef.address}')`, rangeRef),
        headers: {
            "workbook-session-id": rangeRef.sessionId,
            "content-type": "application/json",
        },
        body: update,
        responseTransform: response => {
            const range = response as WorkbookRange;

            return {
                ...range,
                ...rangeRef
            };
        }
    });
}
