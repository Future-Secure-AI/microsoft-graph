import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import type { WorkbookWorksheet } from "../../model/models.js";
import generatePath from "../../utils/generatePath.js";
import type { WorkbookRef } from "../../workbooks/WorkbookRef.js";

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
