import type { WorkbookWorksheet } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { GraphOptions } from "../../models/GraphOptions.js";
import type { WorkbookRef } from "../../models/WorkbookRef.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Create a new worksheet, optionally with a defined name. @see https://learn.microsoft.com/en-us/graph/api/worksheetcollection-add */
export default function createWorkbookWorksheet(workbookRef: WorkbookRef, name?: string, opts?: GraphOptions): GraphOperation<WorkbookWorksheet> {
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
