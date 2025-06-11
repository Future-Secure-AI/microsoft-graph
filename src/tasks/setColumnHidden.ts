/**
 * Set one or more columns visibility.
 * @module setColumnHidden
 * @category Tasks
 */

import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import { isAllColumnsAddress } from "../services/addressManipulation.ts";

/**
 * Set one or more columns visibility.
 * @param rangeRef Reference to the workbook range representing the columns to hide or show.
 * @param hidden Boolean indicating whether to hide (`true`) or show (`false`) the columns.
 */
export default async function setColumnHidden(rangeRef: WorkbookRangeRef, hidden: boolean): Promise<void> {
	if (isAllColumnsAddress(rangeRef.address)) {
		throw new Error("Cannot hide all columns");
	}

	await updateWorkbookRange(rangeRef, {
		columnHidden: hidden,
	});
}
