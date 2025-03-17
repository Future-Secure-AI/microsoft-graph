import generatePath from "../../generatePath.js";
import type { GraphOptions } from "../../GraphOptions.js";
import type { GraphRequest } from "../../GraphRequest.js";
import type { WorkbookWorksheet } from "../../models.js";
import type { WorkbookWorksheetRef } from "./WorkbookWorksheetRef.js";

/** Update the name, position and/or visibility of a worksheet. @see https://learn.microsoft.com/en-us/graph/api/worksheet-update */
export default function updateWorkbookWorksheet(worksheetRef: WorkbookWorksheetRef, updates: { name?: string; position?: number; visibility?: "Visible" | "Hidden" | "VeryHidden"; }, opts?: GraphOptions): GraphRequest<WorkbookWorksheet> {
    return {
        method: "PATCH",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}", worksheetRef),
        headers: {
            'workbook-session-id': worksheetRef.sessionId,
            'content-type': 'application/json',
        },
        body: updates,
        dependsOn: opts?.dependsOn,
    };
}
