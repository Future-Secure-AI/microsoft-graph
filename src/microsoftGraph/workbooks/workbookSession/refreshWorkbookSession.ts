import { type GraphOptions, type GraphRequest, generatePath } from "../../api.js";
import InvalidArgumentError from "../../errors/InvalidArgumentError.js";
import type { WorkbookRef } from "../WorkbookRef.js";

/** Refresh a workbook session. @see https://learn.microsoft.com/en-us/graph/api/workbook-refreshsession */
export default function refreshWorkbookSession(workbookRef: WorkbookRef, opts?: GraphOptions): GraphRequest<void> {
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
