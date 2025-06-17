import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import createWorkbookAndStartSession from "../../tasks/createWorkbookAndStartSession.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";

describe("createWorkbookSession", () => {
	it("should create a workbook session with persistChanges", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		try {
			expect(workbook.sessionId).toBeTruthy();
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("should create a workbook session without persistChanges", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		try {
			expect(workbook.sessionId).toBeTruthy();
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
