import { generatePath, type GraphOptions, type GraphRequest } from "../../api.js";
import type { WorkbookWorksheet } from "../../models.js";
import type { WorkbookRef } from "../WorkbookRef.js";

/** Create a new worksheet, optionally with a defined name. @see https://learn.microsoft.com/en-us/graph/api/worksheetcollection-add */
export default function createWorkbookWorksheet(workbookRef: WorkbookRef, name?: string, opts?: GraphOptions): GraphRequest<WorkbookWorksheet> {
    return {
        method: "POST",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/add", workbookRef),
        headers: {
            'workbook-session-id': workbookRef.sessionId,
            'content-type': 'application/json',
        },
        body: {
            name
        },
        dependsOn: opts?.dependsOn,
    };
}
