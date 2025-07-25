import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { createDefaultWorkbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookTable from "./createWorkbookTable.ts";
import listWorkbookTableColumns from "./listWorkbookTableColumns.ts";

describe("listWorkbookTableColumns", () => {
	it("can list columns in an existing table", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);

		try {
			const worksheetRef = createDefaultWorkbookWorksheetRef(workbook);
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:D4");
			const table = await createWorkbookTable(rangeRef, true);

			await calculateWorkbook(workbook);

			const columns = await listWorkbookTableColumns(table);
			expect(columns.length).toBeGreaterThan(0);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
