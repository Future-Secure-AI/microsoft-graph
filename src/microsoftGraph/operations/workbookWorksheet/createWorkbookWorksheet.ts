import { operation } from "../../graphApi.ts";
import type { WorkbookWorksheet } from "../../models/Dto.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/WorkbookRef.ts";
import type { WorkbookWorksheetName } from "../../models/WorkbookWorksheetName.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Create a new worksheet, optionally with a defined name. @see https://learn.microsoft.com/en-us/graph/api/worksheetcollection-add */
export default function createWorkbookWorksheet(workbookRef: WorkbookRef, name?: WorkbookWorksheetName): GraphOperation<WorkbookWorksheet> {
    return operation({
        method: "POST",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/add", workbookRef),
        headers: {
            "workbook-session-id": workbookRef.sessionId,
            "content-type": "application/json",
        },
        body: {
            name
        },
    });
}
