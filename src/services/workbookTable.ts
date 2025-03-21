
import type { WorkbookTableId } from "../models/WorkbookTableId.ts";
import type { WorkbookTableRef } from "../models/WorkbookTableRef.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";

export function workbookTableRef(worksheetRef: WorkbookWorksheetRef, tableId: WorkbookTableId | undefined): WorkbookTableRef {
    if (!tableId) {
        throw new Error("TableId is missing");
    }
    return {
        ...worksheetRef,
        tableId: tableId
    };
}