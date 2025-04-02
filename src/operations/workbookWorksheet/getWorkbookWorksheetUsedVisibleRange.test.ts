import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../../services/workbookWorksheet.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import setRowHidden from "../../tasks/setRowHidden.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import updateWorkbookRange from "../workbookRange/updateWorkbookRange.ts";
import getWorkbookWorksheetUsedVisibleRange from "./getWorkbookWorksheetUsedVisibleRange.ts";

describe("getWorkbookWorksheetUsedVisibleRange", () => {
	it("can retrieve the used visible range from an existing workbook", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");

		try {
			await updateWorkbookRange(rangeRef, {
				values: [
					[1, 2],
					[3, 4],
				],
			});

			await setRowHidden(createWorkbookRangeRef(worksheetRef, "1:1"), true);
			await calculateWorkbook(workbook);

			const usedRange = await getWorkbookWorksheetUsedVisibleRange(worksheetRef);
			expect(usedRange.values).toEqual([[3, 4]]);
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});
});
