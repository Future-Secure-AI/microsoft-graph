import ProtocolError from "../errors/ProtocolError.ts";
import type { WorkbookWorksheet } from "../models/Dto.ts";
import type { WorkbookRef } from "../models/WorkbookRef.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";
import listWorkbookWorksheetsOp from "../operations/workbookWorksheet/listWorkbookWorksheets.ts";
import { workbookWorksheetRef } from "../services/workbookWorksheet.ts";

export async function listWorkbookWorksheetRefs(workbookRef: WorkbookRef): Promise<(WorkbookWorksheetRef & WorkbookWorksheet)[]> {
    const worksheets = await listWorkbookWorksheetsOp(workbookRef);

    return worksheets.value.map(worksheet => {
        const worksheetRef = workbookWorksheetRef(workbookRef, worksheet.id);

        if (!worksheet.name) {
            throw new ProtocolError("Item.name is undefined");
        }

        return {
            ...worksheet,
            ...worksheetRef,
        }
    });
}
