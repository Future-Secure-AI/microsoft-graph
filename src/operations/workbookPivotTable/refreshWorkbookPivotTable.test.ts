import { describe, expect, it } from "vitest";
import type { WorkbookPivotTableId } from "../../models/WorkbookPivotTable.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookPivotTableRef } from "../../services/workbookPivotTable.ts";
import { createDefaultWorkbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import createWorkbookAndStartSession from "../../tasks/createWorkbookAndStartSession.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import refreshWorkbookPivotTable from "./refreshWorkbookPivotTable.ts";

const notFoundPattern = /The requested resource doesn't exist/i;
describe("refreshWorkbookPivotTable", () => {
	it("can refresh a pivot table by its ID", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);

		try {
			const worksheetRef = createDefaultWorkbookWorksheetRef(workbook);
			const pivotTableRef = createWorkbookPivotTableRef(worksheetRef, "a" as WorkbookPivotTableId);

			await expect(() => refreshWorkbookPivotTable(pivotTableRef)).rejects.toThrowError(notFoundPattern);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
