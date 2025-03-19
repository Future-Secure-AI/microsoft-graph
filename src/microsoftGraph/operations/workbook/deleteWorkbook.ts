
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { WorkbookRef } from "../../models/WorkbookRef.js";
import deleteDriveItem from "../driveItem/deleteDriveItem.js";

/** Delete a workbook. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export default function deleteWorkbook(workbookRef: WorkbookRef): GraphOperation<void> {
    return deleteDriveItem(workbookRef);
}
