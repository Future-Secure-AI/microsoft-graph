import { type GraphRequest, generatePath } from "../api.js";
import type { WorkbookRange } from "../models.js";
import type { WorkbookWorksheetRef } from "./WorkbookWorksheetRef.js";

/** Retrieve the used range in a worksheet, ignoring trailing rows and columns that are blank. @see https://learn.microsoft.com/en-us/graph/api/range-usedrange */
export default function getUsedRange(worksheetRef: WorkbookWorksheetRef): GraphRequest<WorkbookRange> {
    return {
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range/usedRange`, worksheetRef),
        headers: {
            'workbook-session-id': worksheetRef.sessionId,
        },
        body: null
    };
}
