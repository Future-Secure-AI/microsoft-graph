import InvalidArgumentError from "../../errors/InvalidArgumentError.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { WorkbookRef } from "../../models/WorkbookRef.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Close an existing workbook session. @see https://learn.microsoft.com/en-us/graph/api/workbook-closesession */
export default function closeWorkbookSession(workbookRef: WorkbookRef): GraphOperation<void> {
    if (!workbookRef.sessionId) {
        throw new InvalidArgumentError("Workbook session ID is required to close a session.");
    }
    return {
        method: "POST",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/closeSession", workbookRef),
        headers: {
            "workbook-session-id": workbookRef.sessionId,
        },
        body: null,
    };
}
