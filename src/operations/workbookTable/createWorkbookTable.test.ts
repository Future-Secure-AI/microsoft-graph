import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { createDefaultWorkbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookTable from "./createWorkbookTable.ts";

describe("createWorkbookTable", () => {
	it("can create a new table in an existing worksheet", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);

		try {
			const worksheetRef = createDefaultWorkbookWorksheetRef(workbook);
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:D4");
			const table = await createWorkbookTable(rangeRef, true);
			expect(table.id).toBeTruthy();
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
