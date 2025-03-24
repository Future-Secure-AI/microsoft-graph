import type { WorkbookTableRow } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookTableRef } from "../../models/WorkbookTableRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Retrieve a list of rows in a table. @see https://learn.microsoft.com/en-us/graph/api/tablerow-list */
export default function listWorkbookTableRows(tableRef: WorkbookTableRef): GraphOperation<WorkbookTableRow[]> {
    return operation({
        method: "GET",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/tables/{table-id}/rows", tableRef),
        headers: {
            "workbook-session-id": tableRef.sessionId,
        },
        body: null,
        responseTransform: response => {
            const list = response as { value: WorkbookTableRow[]; };
            return list.value;
        }
    });
}