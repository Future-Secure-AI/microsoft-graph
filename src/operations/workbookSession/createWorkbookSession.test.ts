import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookSession from "./createWorkbookSession.ts";

describe("createWorkbookSession", () => {
	it("should create a workbook session with persistChanges set to true", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		try {
			const result = await createWorkbookSession(workbook);

			expect(result.sessionId).toBeTruthy();
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});

	it("should create a workbook session with persistChanges set to false", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		try {
			const result = await createWorkbookSession(workbook, false);

			expect(result.sessionId).toBeTruthy();
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});
});
