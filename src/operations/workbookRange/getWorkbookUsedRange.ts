import type { WorkbookRange } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRangeAddressUnderlying } from "../../models/WorkbookRangeAddress.ts";
import type { WorkbookRangeRef } from "../../models/WorkbookWorksheetRangeRef.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { workbookRangeRef } from "../../services/workbookRange.ts";

/** Retrieve the used range in a worksheet, ignoring trailing rows and columns that are blank. @see https://learn.microsoft.com/en-us/graph/api/range-usedrange */
export default function getWorkbookUsedRange(worksheetRef: WorkbookWorksheetRef): GraphOperation<WorkbookRange & WorkbookRangeRef> {
    return operation({
        method: "GET",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range/usedRange", worksheetRef),
        headers: {
            "workbook-session-id": worksheetRef.sessionId,
        },
        body: null,
        responseTransform: response => {
            const range = response as WorkbookRange;
            const rangeRef = workbookRangeRef(worksheetRef, range.address as WorkbookRangeAddressUnderlying);

            return {
                ...range,
                ...rangeRef
            };
        }
    });
}
