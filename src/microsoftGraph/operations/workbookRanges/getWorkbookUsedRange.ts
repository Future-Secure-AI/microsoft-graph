import type { GraphOptions } from "../../GraphOptions.js";
import type { GraphRequest } from "../../GraphRequest.js";
import type { WorkbookRange } from "../../model/models.js";
import type { WorkbookWorksheetRef } from "../../model/WorkbookWorksheetRef.js";
import generatePath from "../../utils/generatePath.js";

/** Retrieve the used range in a worksheet, ignoring trailing rows and columns that are blank. @see https://learn.microsoft.com/en-us/graph/api/range-usedrange */
export default function getWorkbookUsedRange(worksheetRef: WorkbookWorksheetRef, opts?: GraphOptions): GraphRequest<WorkbookRange> {
    return {
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range/usedRange`, worksheetRef),
        headers: {
            'workbook-session-id': worksheetRef.sessionId,
        },
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
