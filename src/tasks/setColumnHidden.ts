import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import type { RowRangeAddress } from "../models/Address.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import { decomposeAddress, isAllColumnsAddress } from "../services/addressManipulation.ts";

/**
 * Hide or show one or more columns.
 *
 * @param rangeRef - A reference to the workbook range representing the columns to hide or show.
 * @param hidden - A boolean indicating whether to hide (`true`) or show (`false`) the columns.
 * @returns The updated workbook range.
 */
export default async function setColumnHidden(rangeRef: WorkbookRangeRef, hidden: boolean): Promise<WorkbookRange & WorkbookRangeRef> {
	if (isAllColumnsAddress(rangeRef.address)) {
		throw new Error("Cannot hide all columns");
	}

	const components = decomposeAddress(rangeRef.address);
	rangeRef.address = `${components.startColumn}:${components.endColumn}` as RowRangeAddress; // Workaround API explicitly wanting a range

	return await updateWorkbookRange(rangeRef, {
		columnHidden: hidden,
	});
}
