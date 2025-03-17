import type { GraphOptions } from "../../GraphOptions.js";
import type { GraphRequest } from "../../GraphRequest.js";
import generatePath from "../../utils/generatePath.js";
import type { WorkbookWorksheetRef } from "./WorkbookWorksheetRef.js";

/** Permanently delete a worksheet. @see https://learn.microsoft.com/en-us/graph/api/worksheet-delete */
export default function deleteWorkbookWorksheet(worksheetRef: WorkbookWorksheetRef, opts?: GraphOptions): GraphRequest<void> {
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
