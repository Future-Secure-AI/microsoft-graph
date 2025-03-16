import type { GraphRequest } from "../api.js";
import deleteDriveItem from "../drives/driveItem/deleteDriveItem.js";
import type { WorkbookRef } from "./WorkbookRef.js";

/** Delete a workbook. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export default function deleteWorkbook(workbookRef: WorkbookRef): GraphRequest<void> {
    return deleteDriveItem(workbookRef);
}
