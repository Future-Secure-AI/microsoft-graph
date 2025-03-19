import { operation } from "../../graphApi.js";
import type { WorkbookRange } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Retrieve the used range in a worksheet, ignoring trailing rows and columns that are blank. @see https://learn.microsoft.com/en-us/graph/api/range-usedrange */
export default function getWorkbookUsedRange(worksheetRef: WorkbookWorksheetRef): GraphOperation<WorkbookRange> {
    return operation({
        method: "GET",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range/usedRange", worksheetRef),
        headers: {
            "workbook-session-id": worksheetRef.sessionId,
        },
        body: null,
    });
}
