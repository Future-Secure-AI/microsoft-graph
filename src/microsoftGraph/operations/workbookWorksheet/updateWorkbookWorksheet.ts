import type { WorkbookWorksheet } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Update the name, position and/or visibility of a worksheet. @see https://learn.microsoft.com/en-us/graph/api/worksheet-update */
export default function updateWorkbookWorksheet(worksheetRef: WorkbookWorksheetRef, updates: { name?: string; position?: number; visibility?: "Visible" | "Hidden" | "VeryHidden"; }): GraphOperation<WorkbookWorksheet> {
    return {
        method: "PATCH",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}", worksheetRef),
        headers: {
            "workbook-session-id": worksheetRef.sessionId,
            "content-type": "application/json",
        },
        body: updates,
    };
}
