import { describe, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../../services/workbookWorksheet.ts";
import createWorkbookAndStartSession from "../../tasks/createWorkbookAndStartSession.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import refreshAllWorkbookPivotTables from "./refreshAllWorkbookPivotTables.ts";

describe("refreshAllWorkbookWorksheetPivotTables", () => {
	it("can refresh all pivot tables in a worksheet without error", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		try {
			await refreshAllWorkbookPivotTables(worksheetRef);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
