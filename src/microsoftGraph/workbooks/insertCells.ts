import { type GraphRequest, generatePath } from "../api.js";
import type { WorkbookRange } from "../models.js";
import type { WorkbookWorksheetRef } from "./WorkbookWorksheetRef.js";

/** Insert a new blank range at a specified address, shifting existing cells. Use `updateRange` after to set content. @see https://learn.microsoft.com/en-us/graph/api/range-insert */
export default function insertCells(worksheetRef: WorkbookWorksheetRef, address: string, shift: "Down" | "Right"): GraphRequest<WorkbookRange> {
    return {
        method: "POST",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')/insert`, worksheetRef),
        headers: {
            'workbook-session-id': worksheetRef.sessionId,
            'content-type': 'application/json',
        },
        body: {
            shift
        }
    };
}
