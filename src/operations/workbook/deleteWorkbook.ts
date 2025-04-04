import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/WorkbookRef.ts";
import deleteDriveItem from "../driveItem/deleteDriveItem.ts";

/**
 * Delete a workbook.
 *
 * @param workbookRef - A reference to the workbook to be deleted.
 * @returns Nothing.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete
 */
export default function deleteWorkbook(workbookRef: WorkbookRef): GraphOperation<void> {
	return deleteDriveItem(workbookRef);
}
