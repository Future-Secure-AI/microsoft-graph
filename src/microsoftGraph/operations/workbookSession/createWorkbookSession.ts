import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import type { WorkbookSessionId } from "../../model/WorkbookSessionId.js";
import generatePath from "../../utils/generatePath.js";
import type { WorkbookRef } from "../../workbooks/WorkbookRef.js";

/** Create a new workbook session. Typically the persistent session expires after about 5 minutes of inactivity. Non persistent session expires after about 7 minutes of inactivity. Most performant with `persistChanges = true`. @see https://learn.microsoft.com/en-us/graph/api/workbook-createsession @see https://learn.microsoft.com/en-us/graph/api/resources/excel#usage */
export default function createWorkbookSession(workbookRef: WorkbookRef, persistChanges = true, opts?: GraphOptions): GraphOperation<{ id: WorkbookSessionId; }> {
    return {
        method: "POST",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/createSession`, workbookRef),
        headers: {
            'content-type': 'application/json',
        },
        body: {
            persistChanges
        },
        dependsOn: opts?.dependsOn,
    };
}
