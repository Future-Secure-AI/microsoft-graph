import type { Address } from "../models/Address.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";

/**
 * Creates a reference to a workbook range.
 * @param worksheetRef - The reference to the worksheet containing the range.
 * @param address - The address of the range.
 * @returns A reference to the workbook range.
 */
export function createWorkbookRangeRef(worksheetRef: WorkbookWorksheetRef, address: Address): WorkbookRangeRef {
	return {
		contextId: worksheetRef.contextId,
		siteId: worksheetRef.siteId,
		driveId: worksheetRef.driveId,
		itemId: worksheetRef.itemId,
		sessionId: worksheetRef.sessionId,
		worksheetId: worksheetRef.worksheetId,
		address: address,
	};
}
