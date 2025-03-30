import type { WorkbookWorksheet } from "@microsoft/microsoft-graph-types";
import NotFoundError from "../errors/NotFoundError.ts";
import type { WorkbookRef } from "../models/WorkbookRef.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";
import listWorkbookWorksheets from "../operations/workbookWorksheet/listWorkbookWorksheets.ts";

/** Get a worksheet by it's name. Throws error if not found. */
export default async function getWorkbookWorksheetByName(workbookRef: WorkbookRef, name: string): Promise<WorkbookWorksheet & WorkbookWorksheetRef> {
	// TODO: More performant to get it by a direct call without listing all workbooks?
	const worksheets = await listWorkbookWorksheets(workbookRef);
	const worksheet = worksheets.find((worksheetRef) => worksheetRef.name === name);

	if (!worksheet) {
		throw new NotFoundError(`Worksheet '${name}' not found.`);
	}

	return worksheet;
}
