/**
 * Utilities for working with workbook ranges and references.
 * @module workbookRange
 * @category Services
 */

import ProtocolError from "../errors/ProtocolError.ts";
import type { Address } from "../models/Address.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";
import { normalizeAddress } from "./addressManipulation.ts";

/**
 * Creates a reference to a workbook range.
 * @param worksheetRef - The reference to the worksheet containing the range.
 * @param address - The address of the range.
 * @returns A reference to the workbook range.
 */
export function createWorkbookRangeRef(worksheetRef: WorkbookWorksheetRef, address: Address | undefined): WorkbookRangeRef {
	if (!address) {
		throw new ProtocolError("Address missing.");
	}

	const normalizedAddress = normalizeAddress(address);

	return {
		context: worksheetRef.context,
		siteId: worksheetRef.siteId,
		driveId: worksheetRef.driveId,
		itemId: worksheetRef.itemId,
		sessionId: worksheetRef.sessionId,
		worksheetId: worksheetRef.worksheetId,
		address: normalizedAddress,
	};
}
