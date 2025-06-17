import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import createWorkbook from "./createWorkbook.ts";

describe("createWorkbook", () => {
	it("can create a new workbook", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);

		expect(workbook.name).toBe(workbookName);

		await safeDeleteWorkbook(workbook);
	});
});
