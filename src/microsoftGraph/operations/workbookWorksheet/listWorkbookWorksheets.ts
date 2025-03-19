import { operation } from "../../graphApi.js";
import type { WorkbookWorksheet } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { WorkbookRef } from "../../models/WorkbookRef.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Retrieve a list of worksheets. @see https://learn.microsoft.com/en-us/graph/api/worksheet-list */
export default function listWorkbookWorksheets(workbookRef: WorkbookRef): GraphOperation<{ value: WorkbookWorksheet[] }> {
    return operation({
        method: "GET",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets", workbookRef),
        headers: {
            "workbook-session-id": workbookRef.sessionId,
        },
        body: null,
    });
}
