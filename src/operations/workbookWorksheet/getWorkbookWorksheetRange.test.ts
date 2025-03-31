import { describe, expect, it } from "vitest";
import type { RangeAddress } from "../../models/RangeAddress.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../../services/workbookWorksheet.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import updateWorkbookRange from "../workbookRange/updateWorkbookRange.ts";

describe("getWorkbookWorksheetRange", () => {
	it("can retrieve a range from an existing worksheet", async () => {
		const address = "A1:B2" as RangeAddress;
		const values = [
			[1, 2],
			[3, 4],
		];

		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, address);

		try {
			const range = await updateWorkbookRange(rangeRef, {
				values: values,
			});

			expect(range.values).toEqual(values);
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});
});
