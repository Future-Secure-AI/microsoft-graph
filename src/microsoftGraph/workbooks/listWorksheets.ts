/** GraphAPI Workbook Worksheet bindings. NO NOT ADD BUSINESS OR MANIPULATION LOGIC HERE! */
import { generatePath, type GraphRequest } from "../api.js";
import type { WorkbookWorksheet } from "../models.js";
import type { WorkbookRef } from "./WorkbookRef.js";

/** Retrieve a list of worksheets. @see https://learn.microsoft.com/en-us/graph/api/worksheet-list */
export default function listWorksheets(workbookRef: WorkbookRef): GraphRequest<{ value: WorkbookWorksheet[] }> {
    return {
        method: "GET",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets", workbookRef),
        headers: {
            'workbook-session-id': workbookRef.sessionId,
        },
        body: null
    };
}
