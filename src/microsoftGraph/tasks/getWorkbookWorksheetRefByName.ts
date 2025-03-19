import type { WorkbookRef } from "../models/WorkbookRef.js";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.js";
import { listWorkbookWorksheetRefs } from "./listWorkbookWorksheetRefs.js";

export async function getWorkbookWorksheetRefByName(workbookRef: WorkbookRef, name: string): Promise<WorkbookWorksheetRef> {
    const worksheetRefs = await listWorkbookWorksheetRefs(workbookRef);
    const worksheetRef = worksheetRefs.find(worksheetRef => worksheetRef.name === name);

    if (!worksheetRef) {
        throw new Error(`Worksheet '${name}' not found.`);
    }

    return worksheetRef;
}


