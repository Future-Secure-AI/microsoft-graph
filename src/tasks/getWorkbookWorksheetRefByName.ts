import type { WorkbookWorksheet } from "@microsoft/microsoft-graph-types";
import NotFoundError from "../errors/NotFoundError.ts";
import type { WorkbookRef } from "../models/WorkbookRef.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";
import listWorkbookWorksheets from "../operations/workbookWorksheet/listWorkbookWorksheets.ts";

export default async function getWorkbookWorksheetByName(workbookRef: WorkbookRef, name: string): Promise<WorkbookWorksheet & WorkbookWorksheetRef> {
	// TODO: Probably can get this from a direct API call without fetching all worksheets
	const worksheets = await listWorkbookWorksheets(workbookRef);
	const worksheet = worksheets.find((worksheetRef) => worksheetRef.name === name);

	if (!worksheet) {
		throw new NotFoundError(`Worksheet '${name}' not found.`);
	}

	return worksheet;
}
