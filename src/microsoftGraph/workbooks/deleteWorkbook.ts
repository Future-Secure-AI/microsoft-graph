import type { GraphOperation } from "../models/GraphOperation.js";
import deleteDriveItem from "../operations/driveItem/deleteDriveItem.js";
import type { WorkbookRef } from "./WorkbookRef.js";

/** Delete a workbook. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export default function deleteWorkbook(workbookRef: WorkbookRef): GraphOperation<void> {
    return deleteDriveItem(workbookRef);
}
