import ProtocolError from "../errors/ProtocolError.js";
import type { WorkbookWorksheet } from "../models/Dto.js";
import type { WorkbookRef } from "../models/WorkbookRef.js";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.js";
import listWorkbookWorksheetsOp from "../operations/workbookWorksheet/listWorkbookWorksheets.js";
import { workbookWorksheetRef } from "../services/workbookWorksheet.js";

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
