
import { operation } from "../../graphApi.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Permanently delete a worksheet. @see https://learn.microsoft.com/en-us/graph/api/worksheet-delete */
export default function deleteWorkbookWorksheet(worksheetRef: WorkbookWorksheetRef): GraphOperation<void> {
    return operation({
        method: "DELETE",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}", worksheetRef),
        headers: {
            "workbook-session-id": worksheetRef.sessionId,
        },
        body: null,
    });
}
