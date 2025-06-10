/**
 * Delete a workbook.
 * @module deleteWorkbook
 * @category Operations
 */

import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/Workbook.ts";
import deleteDriveItem from "../driveItem/deleteDriveItem.ts";

/**
 * Delete a workbook.
 * @param workbookRef Reference to the workbook to be deleted.
 *  * @remarks This is an alias for `deleteDriveItem`, as workbooks are treated as drive items in Microsoft Graph.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete
 */
export default function deleteWorkbook(workbookRef: WorkbookRef): GraphOperation<void> {
	return deleteDriveItem(workbookRef);
}
