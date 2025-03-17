import InvalidArgumentError from "../../errors/InvalidArgumentError.js";
import type { GraphOptions } from "../../GraphOptions.js";
import type { GraphRequest } from "../../GraphRequest.js";
import generatePath from "../../utils/generatePath.js";
import type { WorkbookRef } from "../WorkbookRef.js";

/** Close an existing workbook session. @see https://learn.microsoft.com/en-us/graph/api/workbook-closesession */
export default function closeWorkbookSession(workbookRef: WorkbookRef, opts?: GraphOptions): GraphRequest<void> {
    if (!workbookRef.sessionId) throw new InvalidArgumentError("Workbook session ID is required to close a session.");
    return {
        method: "POST",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/closeSession`, workbookRef),
        headers: {
            'workbook-session-id': workbookRef.sessionId,
        },
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
