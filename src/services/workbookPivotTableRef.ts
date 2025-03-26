
import type { WorkbookPivotTableId } from "../models/WorkbookPivotTableId.ts";
import type { WorkbookPivotTableRef } from "../models/WorkbookPivotTableRef.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";

export function workbookPivotTableRef(worksheetRef: WorkbookWorksheetRef, pivotTableId: WorkbookPivotTableId | undefined): WorkbookPivotTableRef {
	if (!pivotTableId) {
		throw new Error("PivotTable Id is missing");
	}
	return {
		siteId: worksheetRef.siteId,
		driveId: worksheetRef.driveId,
		itemId: worksheetRef.itemId,
		worksheetId: worksheetRef.worksheetId,
		sessionId: worksheetRef.sessionId,
		pivotTableId: pivotTableId
	};
}
