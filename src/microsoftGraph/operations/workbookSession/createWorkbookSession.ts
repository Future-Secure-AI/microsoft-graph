import type { DriveItemRef } from "../../models/DriveItemRef.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { WorkbookSessionId } from "../../models/WorkbookSessionId.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Create a new workbook session. Typically the persistent session expires after about 5 minutes of inactivity. Non persistent session expires after about 7 minutes of inactivity. Most performant with `persistChanges = true`. @see https://learn.microsoft.com/en-us/graph/api/workbook-createsession @see https://learn.microsoft.com/en-us/graph/api/resources/excel#usage */
export default function createWorkbookSession(itemRef: DriveItemRef, persistChanges = true): GraphOperation<{ id: WorkbookSessionId; }> {
    return {
        method: "POST",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/createSession", itemRef),
        headers: {
            "content-type": "application/json",
        },
        body: {
            persistChanges
        },
    };
}
