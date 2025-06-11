/**
 * Set one or more rows visibility.
 * @module setRowHidden
 * @category Tasks
 */

import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import { isAllRowsAddress } from "../services/addressManipulation.ts";

/**
 * Set one or more rows visibility.
 * @param rangeRef Reference to the workbook range representing the rows to hide or show.
 * @param hidden Boolean indicating whether to hide (`true`) or show (`false`) the rows.
 * @returns The updated workbook range.
 */
export default async function setRowHidden(rangeRef: WorkbookRangeRef, hidden: boolean): Promise<void> {
	if (isAllRowsAddress(rangeRef.address)) {
		throw new Error("Cannot hide all rows");
	}

	await updateWorkbookRange(rangeRef, {
		rowHidden: hidden,
	});
}
