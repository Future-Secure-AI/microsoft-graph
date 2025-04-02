import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { createDefaultWorkbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import getWorkbookWorksheetRange from "../workbookRange/getWorkbookWorksheetRange.ts";
import updateWorkbookRange from "../workbookRange/updateWorkbookRange.ts";
import createWorkbookTable from "./createWorkbookTable.ts";
import deleteWorkbookTablePreservingValues from "./deleteWorkbookTablePreservingValues.ts";
import getWorkbookTable from "./getWorkbookTable.ts";

describe("deleteWorkbookTablePreservingValues", () => {
	it("can convert a table to a normal range while preserving values", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);

		try {
			const worksheetRef = createDefaultWorkbookWorksheetRef(workbook);
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:D4");
			const table = await createWorkbookTable(rangeRef, true);

			await updateWorkbookRange(rangeRef, {
				values: [
					["A", "B", "C", "D"],
					[1, 2, 3, 4],
					[5, 6, 7, 8],
					[9, 10, 11, 12],
				],
			});

			await deleteWorkbookTablePreservingValues(table);

			await expect(async () => {
				await getWorkbookTable(table);
			}).rejects.toThrow();

			const range = await getWorkbookWorksheetRange(rangeRef);
			expect(range.values).toEqual([
				["A", "B", "C", "D"],
				[1, 2, 3, 4],
				[5, 6, 7, 8],
				[9, 10, 11, 12],
			]);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});
});
