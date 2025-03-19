import InvalidArgumentError from "../../errors/InvalidArgumentError.js";
import { operation } from "../../graphApi.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { WorkbookRef } from "../../models/WorkbookRef.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Refresh a workbook session. @see https://learn.microsoft.com/en-us/graph/api/workbook-refreshsession */
export default function refreshWorkbookSession(workbookRef: WorkbookRef): GraphOperation<void> {
    if (!workbookRef.sessionId) {
        throw new InvalidArgumentError("Workbook session ID is required to refresh a session.");
    }
    return operation({
        method: "POST",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/refreshSession", workbookRef),
        headers: {
            "workbook-session-id": workbookRef.sessionId,
            "content-type": "application/json",
        },
        body: null,
    });
}
