import type { WorkbookTableRow } from "../models/Dto.ts";
import type { WorkbookTableRef } from "../models/WorkbookTableRef.ts";
import getWorkbookRange from "../operations/workbookRange/getWorkbookRange.ts";
import listWorkbookTableRows from "../operations/worktookTable/listWorkbookTableRows.ts";

export default async function getWorkbookTableVisible(tableRef: WorkbookTableRef): Promise<WorkbookTableRow[]> {
    const rows = await listWorkbookTableRows(tableRef);
    const visibleRows: WorkbookTableRow[] = [];

    for (const row of rows) {
        const index = row.index;
        const rowRange = await getWorkbookRange({
            ...tableRef,
            address: `${index + 1}:${index + 1}`
        });

        if (!rowRange.rowHidden) {
            visibleRows.push(row);
        }
    }

    return visibleRows;
}
