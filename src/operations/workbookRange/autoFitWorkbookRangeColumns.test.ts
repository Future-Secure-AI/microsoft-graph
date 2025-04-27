import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import updateWorkbookRange from "../workbookRange/updateWorkbookRange.ts";
import createWorkbookWorksheet from "../workbookWorksheet/createWorkbookWorksheet.ts";
import autoFitWorkbookRangeColumns from "./autoFitWorkbookRangeColumns.ts";

describe("autoFitWorkbookRangeColumns", () => {
	it("can auto-fit columns in a specific range", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);

		try {
			const worksheet = await createWorkbookWorksheet(workbook);
			const rangeRef = createWorkbookRangeRef(worksheet, "A1:B2");

			await updateWorkbookRange(rangeRef, {
				values: [
					["Long text", "Short"],
					["Another long text", "Medium"],
				],
			});

			await autoFitWorkbookRangeColumns(rangeRef);

			// No specific output to validate, but ensure no errors occur
			expect(true).toBe(true);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});
});
