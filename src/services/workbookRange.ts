import type { RangeAddress, RangeAddressUnderlying } from "../models/RangeAddress.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";

export function createWorkbookRangeRef(worksheetRef: WorkbookWorksheetRef, address: RangeAddressUnderlying): WorkbookRangeRef {
	return {
		contextId: worksheetRef.contextId,
		siteId: worksheetRef.siteId,
		driveId: worksheetRef.driveId,
		itemId: worksheetRef.itemId,
		sessionId: worksheetRef.sessionId,
		worksheetId: worksheetRef.worksheetId,
		address: address as RangeAddress,
	};
}
