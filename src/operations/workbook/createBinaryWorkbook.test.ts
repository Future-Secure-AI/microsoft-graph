import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { binaryWorkbookFileExtension, driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { defaultWorkbookWorksheetName } from "../../services/workbookWorksheet.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import getWorkbookWorksheetRange from "../workbookRange/getWorkbookWorksheetRange.ts";
import updateWorkbookRange from "../workbookRange/updateWorkbookRange.ts";
import createWorkbookSession from "../workbookSession/createWorkbookSession.ts";
import getWorkbookWorksheetByName from "../workbookWorksheet/getWorkbookWorksheetByName.ts";
import calculateWorkbook from "./calculateWorkbook.ts";
import createBinaryWorkbook from "./createBinaryWorkbook.ts";

describe("createWorkbook", () => {
	it("can create a new binary workbook (.xlsb)", async () => {
		const workbookName = generateTempFileName(binaryWorkbookFileExtension);
		const workbookPath = driveItemPath(workbookName);
		const workbook = await createWorkbookSession(await createBinaryWorkbook(getDefaultDriveRef(), workbookPath));
		try {
			const worksheetRef = await getWorkbookWorksheetByName(workbook, defaultWorkbookWorksheetName);
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1");
			const testValue = "test-xlsx";
			await updateWorkbookRange(rangeRef, {
				values: [[testValue]],
			});
			await calculateWorkbook(workbook);

			const range = await getWorkbookWorksheetRange(rangeRef);
			expect(range.values[0][0]).toBe(testValue);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});
});
