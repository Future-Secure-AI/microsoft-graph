import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import type { WorkbookWorksheetRef } from "../../model/WorkbookWorksheetRef.js";
import generatePath from "../../utils/generatePath.js";

/** Permanently delete a worksheet. @see https://learn.microsoft.com/en-us/graph/api/worksheet-delete */
export default function deleteWorkbookWorksheet(worksheetRef: WorkbookWorksheetRef, opts?: GraphOptions): GraphOperation<void> {
    return {
        method: "DELETE",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}", worksheetRef),
        headers: {
            'workbook-session-id': worksheetRef.sessionId,
        },
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
