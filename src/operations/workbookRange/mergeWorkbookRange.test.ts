import { describe, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../../services/workbookWorksheet.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import mergeWorkbookRange from "./mergeWorkbookRange.ts";
import updateWorkbookRange from "./updateWorkbookRange.ts";

describe("mergeWorkbookRange", () => {
	it("merges a range without error", { timeout: 20000 }, async () => {
		const values = [
			[1, 2],
			[3, 4],
		];
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");
		try {
			await updateWorkbookRange(rangeRef, { values });
			await mergeWorkbookRange(rangeRef);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
