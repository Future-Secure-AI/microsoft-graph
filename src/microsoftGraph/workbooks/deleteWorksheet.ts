import { generatePath, type GraphRequest } from "../api.js";
import type { WorkbookWorksheetRef } from "./WorkbookWorksheetRef.js";

/** Permanently delete a worksheet. @see https://learn.microsoft.com/en-us/graph/api/worksheet-delete */
export default function deleteWorksheet(worksheetRef: WorkbookWorksheetRef): GraphRequest<void> {
    return {
        method: "DELETE",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}", worksheetRef),
        headers: {
            'workbook-session-id': worksheetRef.sessionId,
        },
        body: null
    };
}
