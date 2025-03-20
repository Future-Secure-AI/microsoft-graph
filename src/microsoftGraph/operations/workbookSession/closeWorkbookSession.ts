import InvalidArgumentError from "../../errors/InvalidArgumentError.ts";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/WorkbookRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Close an existing workbook session. @see https://learn.microsoft.com/en-us/graph/api/workbook-closesession */
export default function closeWorkbookSession(workbookRef: WorkbookRef): GraphOperation<void> {
    if (!workbookRef.sessionId) {
        throw new InvalidArgumentError("Workbook session ID is required to close a session.");
    }
    return operation({
        method: "POST",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/closeSession", workbookRef),
        headers: {
            "workbook-session-id": workbookRef.sessionId,
        },
        body: null,
    });
}
