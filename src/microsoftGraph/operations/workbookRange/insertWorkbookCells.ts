import { operation } from "../../graphApi.js";
import type { WorkbookRange } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { WorkbookRangeAddress } from "../../models/WorkbookRangeAddress.js";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Insert a new blank range at a specified address, shifting existing cells. Use `updateRange` after to set content. @see https://learn.microsoft.com/en-us/graph/api/range-insert */
export default function insertWorkbookCells(worksheetRef: WorkbookWorksheetRef, address: WorkbookRangeAddress, shift: "Down" | "Right"): GraphOperation<WorkbookRange> {
    return operation({
        method: "POST",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='${address}')/insert`, worksheetRef),
        headers: {
            "workbook-session-id": worksheetRef.sessionId,
            "content-type": "application/json",
        },
        body: {
            shift
        },
    });
}
