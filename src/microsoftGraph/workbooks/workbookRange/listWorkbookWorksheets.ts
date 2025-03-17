import type { GraphOptions } from "../../GraphOptions.js";
import type { GraphRequest } from "../../GraphRequest.js";
import type { WorkbookWorksheet } from "../../models.js";
import generatePath from "../../utils/generatePath.js";
import type { WorkbookRef } from "../WorkbookRef.js";

/** Retrieve a list of worksheets. @see https://learn.microsoft.com/en-us/graph/api/worksheet-list */
export default function listWorkbookWorksheets(workbookRef: WorkbookRef, opts?: GraphOptions): GraphRequest<{ value: WorkbookWorksheet[] }> {
    return {
        method: "GET",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets", workbookRef),
        headers: {
            'workbook-session-id': workbookRef.sessionId,
        },
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
