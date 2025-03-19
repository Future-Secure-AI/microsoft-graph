import { operation } from "../../graphApi.js";
import type { WorkbookWorksheet } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { WorkbookRef } from "../../models/WorkbookRef.js";
import type { WorkbookWorksheetName } from "../../models/WorkbookWorksheetName.js";
import { generatePath } from "../../services/templatedPaths.js";

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
