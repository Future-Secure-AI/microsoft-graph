import type { WorkbookRangeRef } from "../models/WorkbookRange.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheet.ts";
import getWorkbookWorksheetUsedRangeRef from "../operations/workbookWorksheet/getWorkbookWorksheetUsedRangeRef.ts";
import { isErrorWithName } from "../services/error.ts";

export default async function tryGetWorkbookWorksheetUsedRangeRef(worksheetRef: WorkbookWorksheetRef): Promise<WorkbookRangeRef | null> {
	try {
		return await getWorkbookWorksheetUsedRangeRef(worksheetRef);
	} catch (error) {
		if (isErrorWithName(error, "NotFoundError")) {
			return null;
		}
		throw error;
	}
}
