import type { WorkbookWorksheet } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { GraphOptions } from "../../models/GraphOptions.js";
import generatePath from "../../services/generatePath.js";
import type { WorkbookRef } from "../../workbooks/WorkbookRef.js";

/** Retrieve a list of worksheets. @see https://learn.microsoft.com/en-us/graph/api/worksheet-list */
export default function listWorkbookWorksheets(workbookRef: WorkbookRef, opts?: GraphOptions): GraphOperation<{ value: WorkbookWorksheet[] }> {
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
