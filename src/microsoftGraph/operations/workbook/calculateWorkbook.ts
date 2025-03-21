import { operation } from "../../graphApi.ts";
import type { GraphOperation, } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/WorkbookRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Recalculate a workbook. @see https://learn.microsoft.com/en-us/graph/api/workbookapplication-calculate */
export default function calculateWorkbook(workbookRef: WorkbookRef, calculationType: "Recalculate" | "Full" | "FullRebuild" = "Recalculate"): GraphOperation<void> {
    return operation({
        method: "POST",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/application/calculate", workbookRef),
        headers: {
            "content-type": "application/json",
        },
        body: {
            calculationType
        },
        responseTransform: () => undefined
    });
}

/** @deprecated Use calculateWorkbook instead. */
export function recalculateWorkbook(workbookRef: WorkbookRef): GraphOperation<void> {
    return calculateWorkbook(workbookRef, "Recalculate");
}