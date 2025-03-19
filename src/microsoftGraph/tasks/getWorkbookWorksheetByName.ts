import type { WorkbookRef } from "../models/WorkbookRef.js";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.js";
import { listWorkbookWorksheets } from "./listWorkbookWorksheets.js";

export async function getWorkbookWorksheetByName(workbookRef: WorkbookRef, name: string): Promise<WorkbookWorksheetRef> {
    const worksheetRefs = await listWorkbookWorksheets(workbookRef);
    const worksheetRef = worksheetRefs.find(worksheetRef => worksheetRef.name === name);

    if (!worksheetRef) {
        throw new Error(`Worksheet '${name}' not found.`);
    }

    return worksheetRef;
}


