import type { WorkbookPivotTableId } from "./WorkbookPivotTableId.ts";
import type { WorkbookWorksheetRef } from "./WorkbookWorksheetRef.ts";

export type WorkbookPivotTableRef = WorkbookWorksheetRef & {
	pivotTableId: WorkbookPivotTableId;
};
