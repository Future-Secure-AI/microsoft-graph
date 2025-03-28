import type { WorkbookTableId } from "../models/WorkbookTableId.ts";
import type { WorkbookTableRef } from "../models/WorkbookTableRef.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";

export function createWorkbookTableRef(worksheetRef: WorkbookWorksheetRef, tableId: WorkbookTableId | undefined): WorkbookTableRef {
	if (!tableId) {
		throw new Error("TableId is missing");
	}
	return {
		contextId: worksheetRef.contextId,
		siteId: worksheetRef.siteId,
		driveId: worksheetRef.driveId,
		itemId: worksheetRef.itemId,
		worksheetId: worksheetRef.worksheetId,
		sessionId: worksheetRef.sessionId,
		tableId: tableId,
	};
}
