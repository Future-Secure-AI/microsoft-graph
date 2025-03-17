import InvalidArgumentError from "../../errors/InvalidArgumentError.js";
import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import generatePath from "../../utils/generatePath.js";
import type { WorkbookRef } from "../../workbooks/WorkbookRef.js";

/** Refresh a workbook session. @see https://learn.microsoft.com/en-us/graph/api/workbook-refreshsession */
export default function refreshWorkbookSession(workbookRef: WorkbookRef, opts?: GraphOptions): GraphOperation<void> {
    if (!workbookRef.sessionId) throw new InvalidArgumentError("Workbook session ID is required to refresh a session.");
    return {
        method: "POST",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/refreshSession`, workbookRef),
        headers: {
            'workbook-session-id': workbookRef.sessionId,
            'content-type': 'application/json',
        },
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
