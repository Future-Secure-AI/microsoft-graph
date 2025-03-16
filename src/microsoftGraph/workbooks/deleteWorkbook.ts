import type { GraphRequest } from "../api.js";
import deleteItem from "../drives/deleteItem.js";
import type { WorkbookRef } from "./WorkbookRef.js";

/** Delete a workbook. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export default function deleteWorkbook(workbookRef: WorkbookRef): GraphRequest<void> {
    return deleteItem(workbookRef);
}
