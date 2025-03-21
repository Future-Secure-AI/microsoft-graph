import { operation } from "../../graphApi.ts";
import type { WorkbookRange } from "../../models/Dto.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeAddress } from "../../models/WorkbookRangeAddress.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

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
        responseTransform: response => response as WorkbookRange
    });
}
