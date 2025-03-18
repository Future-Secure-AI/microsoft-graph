import InvalidArgumentError from "../../errors/InvalidArgumentError.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { GraphOptions } from "../../models/GraphOptions.js";
import type { WorkbookRef } from "../../models/WorkbookRef.js";
import { jsonContentType } from "../../services/contentTypes.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Refresh a workbook session. @see https://learn.microsoft.com/en-us/graph/api/workbook-refreshsession */
export default function refreshWorkbookSession(workbookRef: WorkbookRef, opts?: GraphOptions): GraphOperation<void> {
    if (!workbookRef.sessionId) {
        throw new InvalidArgumentError("Workbook session ID is required to refresh a session.");
    }
    return {
        method: "POST",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/refreshSession", workbookRef),
        headers: {
            "workbook-session-id": workbookRef.sessionId,
            "content-type": jsonContentType,
        },
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
