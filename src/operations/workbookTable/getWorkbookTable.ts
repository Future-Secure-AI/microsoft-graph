import { operation } from "../../graphApi.ts";
import type { WorkbookTable } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookTableRef } from "../../models/WorkbookTableRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Retrieve a table by its ID. @see https://learn.microsoft.com/en-us/graph/api/table-get */
export default function getWorkbookTable(tableRef: WorkbookTableRef): GraphOperation<WorkbookTable & WorkbookTableRef> {
    return operation({
        method: "GET",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/tables/{table-id}", tableRef),
        headers: {
            "workbook-session-id": tableRef.sessionId,
        },
        body: null,
        responseTransform: response => {
            const table = response as WorkbookTable;

            return {
                ...table,
                ...tableRef
            }
        }
    });
}