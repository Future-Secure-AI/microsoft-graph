
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Permanently delete a worksheet. @see https://learn.microsoft.com/en-us/graph/api/worksheet-delete */
export default function deleteWorkbookWorksheet(worksheetRef: WorkbookWorksheetRef): GraphOperation<void> {
    return operation({
        contextId: worksheetRef.contextId,
        method: "DELETE",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}", worksheetRef),
        headers: {
            "workbook-session-id": worksheetRef.sessionId,
        },
        body: null,
        responseTransform: () => undefined
    });
}
