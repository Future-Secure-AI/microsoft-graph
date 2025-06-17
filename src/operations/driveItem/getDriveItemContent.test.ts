import { describe, expect, it } from "vitest";
import type { DriveItemId } from "../../models/DriveItem.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { createDriveItemRef, driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../../services/workbookWorksheet.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import updateWorkbookRange from "../workbookRange/updateWorkbookRange.ts";
import getDriveItemContent from "./getDriveItemContent.ts";

describe("getDriveItemContent", () => {
	it("can download the content of an existing workbook", { timeout: 20000 }, async () => {
		const workbookPath = driveItemPath(generateTempFileName("xlsx"));
		const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);

		try {
			const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B1");

			await updateWorkbookRange(rangeRef, {
				values: [["Hello", "World"]],
			});

			await calculateWorkbook(workbook);

			const content = await getDriveItemContent(workbook);
			expect(content).toBeInstanceOf(ArrayBuffer);
			expect(content.byteLength).toBeGreaterThan(0);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("throws an error when trying to download a non-existent item", async () => {
		const nonExistentItemRef = createDriveItemRef(getDefaultDriveRef(), "non-existent-item-id" as DriveItemId);

		await expect(getDriveItemContent(nonExistentItemRef)).rejects.toThrow();
	});
});
