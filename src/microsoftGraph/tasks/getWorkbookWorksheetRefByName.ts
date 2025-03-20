import type { WorkbookRef } from "../models/WorkbookRef.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";
import { listWorkbookWorksheetRefs } from "./listWorkbookWorksheetRefs.ts";

export async function getWorkbookWorksheetRefByName(workbookRef: WorkbookRef, name: string): Promise<WorkbookWorksheetRef> {
    const worksheetRefs = await listWorkbookWorksheetRefs(workbookRef);
    const worksheetRef = worksheetRefs.find(worksheetRef => worksheetRef.name === name);

    if (!worksheetRef) {
        throw new Error(`Worksheet '${name}' not found.`);
    }

    return worksheetRef;
}


