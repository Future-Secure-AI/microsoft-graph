import type { WorkbookRangeView } from "@microsoft/microsoft-graph-types";
import type { WorkbookTableRef } from "../models/WorkbookTableRef.ts";
import getWorkbookVisibleRange from "../operations/workbookRange/getWorkbookVisibleRange.ts";
import getWorkbookTableBodyRange from "../operations/workbookTable/getWorkbookTableBodyRange.ts";

export async function getWorkbookTableVisibleBody(tableRef: WorkbookTableRef): Promise<WorkbookRangeView> {
    const range = await getWorkbookTableBodyRange(tableRef);
    const visibleRange = await getWorkbookVisibleRange(range);

    return visibleRange;

    // TODO: Alternate approach. More performant, but doesn't handle hidden columns yet. Pondering!
    // const rows = await listWorkbookTableRows(tableRef);
    // const visibleRows: WorkbookTableRow[] = [];

    // for (const row of rows) {
    //     const index = row.index;
    //     if (index === undefined) {
    //         throw new ProtocolError("Row index is undefined");
    //     }

    //     const rowRange = await getWorkbookWorksheetRange({
    //         ...tableRef,
    //         address: workbookRangeAddress(`${index + 1}:${index + 1}`)
    //     });

    //     if (!rowRange.rowHidden) {
    //         visibleRows.push(row);
    //     }
    // }

    // return visibleRows;
}