import type { WorkbookTableId } from "./WorkbookTableId.ts";
import type { WorkbookWorksheetRef } from "./WorkbookWorksheetRef.ts";

export type WorkbookTableRef = WorkbookWorksheetRef & {
    tableId: WorkbookTableId;
};
