import type { WorkbookWorksheet } from "@microsoft/microsoft-graph-types";
import ProtocolError from "../../errors/ProtocolError.ts";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { WorkbookRef } from "../../models/WorkbookRef.ts";
import type { WorkbookWorksheetId } from "../../models/WorkbookWorksheetId.ts";
import type { WorkbookWorksheetRef } from "../../models/WorkbookWorksheetRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";
import { workbookWorksheetRef } from "../../services/workbookWorksheet.ts";

/** Retrieve a list of worksheets. @see https://learn.microsoft.com/en-us/graph/api/worksheet-list */
export default function listWorkbookWorksheets(workbookRef: WorkbookRef): GraphOperation<(WorkbookWorksheet & WorkbookWorksheetRef)[]> {
    return operation({
        method: "GET",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets", workbookRef),
        headers: {
            "workbook-session-id": workbookRef.sessionId,
        },
        body: null,
        responseTransform: response => {
            const worksheets = response as { value: WorkbookWorksheet[] };

            return worksheets.value.map(worksheet => {
                const worksheetRef = workbookWorksheetRef(workbookRef, worksheet.id as WorkbookWorksheetId);

                if (!worksheet.name) {
                    throw new ProtocolError("Item.name is undefined");
                }

                return {
                    ...worksheet,
                    ...worksheetRef,
                }
            });
        }
    });
}
