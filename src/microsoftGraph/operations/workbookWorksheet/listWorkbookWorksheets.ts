import { operation } from "../../graphApi.ts";
import type { WorkbookWorksheet } from "../../models/Dto.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/WorkbookRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

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
