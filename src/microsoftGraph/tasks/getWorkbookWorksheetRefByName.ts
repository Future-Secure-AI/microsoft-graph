import type { WorkbookRef } from "../models/WorkbookRef.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";
import listWorkbookWorksheets from "../operations/workbookWorksheet/listWorkbookWorksheets.ts";

export default async function getWorkbookWorksheetByName(workbookRef: WorkbookRef, name: string): Promise<WorkbookWorksheetRef> {
    // TODO: Probably can get this from a direct API call without fetching all worksheets
    const worksheetRefs = await listWorkbookWorksheets(workbookRef);
    const worksheetRef = worksheetRefs.find(worksheetRef => worksheetRef.name === name);

    if (!worksheetRef) {
        throw new Error(`Worksheet '${name}' not found.`);
    }

    return worksheetRef;
}


