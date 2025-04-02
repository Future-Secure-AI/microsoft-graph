import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import type { RowRangeAddress } from "../models/Address.ts";
import type { WorkbookRangeRef } from "../models/WorkbookRangeRef.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import { decomposeAddress, isAllRowsAddress } from "../services/addressManipulation.ts";

/**
 * Hide or show one or more rows.
 *
 * @param rangeRef - A reference to the workbook range representing the rows to hide or show.
 * @param hidden - A boolean indicating whether to hide (`true`) or show (`false`) the rows.
 * @returns The updated workbook range.
 */
export default async function setRowHidden(rangeRef: WorkbookRangeRef, hidden: boolean): Promise<WorkbookRange & WorkbookRangeRef> {
	if (isAllRowsAddress(rangeRef.address)) {
		throw new Error("Cannot hide all rows");
	}

	const components = decomposeAddress(rangeRef.address);
	rangeRef.address = `${components.startRow}:${components.endRow}` as RowRangeAddress; // Workaround API explicitly wanting a range

	return await updateWorkbookRange(rangeRef, {
		rowHidden: hidden,
	});
}
