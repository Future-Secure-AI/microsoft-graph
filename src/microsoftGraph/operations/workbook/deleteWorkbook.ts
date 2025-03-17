import type { GraphRequest } from "../GraphRequest.js";
import deleteDriveItem from "../drive/driveItem/deleteDriveItem.js";
import type { WorkbookRef } from "../../model/WorkbookRef.js";

/** Delete a workbook. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export default function deleteWorkbook(workbookRef: WorkbookRef): GraphRequest<void> {
    return deleteDriveItem(workbookRef);
}
