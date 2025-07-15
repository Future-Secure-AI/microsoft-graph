import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import createWorkbookAndStartSession from "../../tasks/createWorkbookAndStartSession.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import existsDriveItem from "./existsDriveItem.ts";

describe("existsDriveItem", () => {
	it("can detect file exists", async () => {
		const driveRef = getDefaultDriveRef();
		const workbookPath = driveItemPath(generateTempFileName("xlsx"));
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);

		try {
			const exists = await existsDriveItem(driveRef, workbookPath);
			expect(exists).toBe(true);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("can detect file does not exists", async () => {
		const driveRef = getDefaultDriveRef();
		const workbookPath = driveItemPath(generateTempFileName("xlsx"));

		const exists = await existsDriveItem(driveRef, workbookPath);
		expect(exists).toBe(false);
	});
});
