import type { GraphOperation } from "../../model/GraphOperation.js";
import type { WorkbookRef } from "../../model/WorkbookRef.js";
import deleteDriveItem from "../driveItem/deleteDriveItem.js";

/** Delete a workbook. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export default function deleteWorkbook(workbookRef: WorkbookRef): GraphOperation<void> {
    return deleteDriveItem(workbookRef);
}
