import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "../workbookWorksheet/createWorkbookWorksheet.ts";
import getWorkbookRangeFont from "./getWorkbookRangeFont.ts";
import setWorkbookRangeFont from "./setWorkbookRangeFont.ts";

describe("setWorkbookRangeFont", () => {
	it("can update the font format of a workbook range", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);

		try {
			const worksheet = await createWorkbookWorksheet(workbook);
			const rangeRef = createWorkbookRangeRef(worksheet, "A1:B2");

			await setWorkbookRangeFont(rangeRef, {
				bold: true,
				color: "#0000FF",
			});

			const font = await getWorkbookRangeFont(rangeRef);
			expect(font.bold).toBe(true);
			expect(font.color).toBe("#0000FF");

			// No specific output to validate, but ensure no errors occur
			expect(true).toBe(true);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});
});
