import { operation } from "../../graphApi.ts";
import type { WorkbookTable } from "../../models/Dto.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Retrieve a list of tables in a worksheet. @see https://learn.microsoft.com/en-us/graph/api/worksheet-list-tables */
export default function listWorkbookTables(worksheetRef: WorkbookWorksheetRef): GraphOperation<{ value: WorkbookTable[] }> {
    return operation({
        method: "GET",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/tables", worksheetRef),
        headers: {
            "workbook-session-id": worksheetRef.sessionId,
        },
        body: null,
    });
}