import { operation } from "../../graphApi.ts";
import type { WorkbookRange } from "../../models/Dto.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookTableRef } from "../../models/WorkbookTableRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Retrieve the data body range of a table. @see https://learn.microsoft.com/en-us/graph/api/table-databodyrange */
export default function getWorkbookTableBodyRange(tableRef: WorkbookTableRef): GraphOperation<WorkbookRange> {
    return operation({
        method: "GET",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/tables/{table-id}/dataBodyRange", tableRef),
        headers: {
            "workbook-session-id": tableRef.sessionId,
        },
        body: null,
        responseTransform: response => response as WorkbookRange
    });
}