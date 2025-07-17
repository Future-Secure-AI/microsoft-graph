import { describe, expect, it } from "vitest";
import type { DriveItemId } from "../models/DriveItem.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { createDriveItemRef, driveItemPath } from "../services/driveItem.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import createWorkbookAndStartSession from "./createWorkbookAndStartSession.ts";
import tryDeleteDriveItem from "./tryDeleteDriveItem.ts";

describe("tryDeleteDriveItem", () => {
	it("can delete drive item", async () => {
		const driveRef = getDefaultDriveRef();
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const workbook = await createWorkbook(driveRef, workbookPath);

		const result = await tryDeleteDriveItem(workbook);
		expect(result).toBe(true);
	});

	it("can not delete workbook with open session", async () => {
		const driveRef = getDefaultDriveRef();
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);

		const result = await tryDeleteDriveItem(workbook);
		expect(result).toBe(false);
	});

	it("can return false when doesn't exist", async () => {
		const driveRef = getDefaultDriveRef();
		const fakeDriveItem = createDriveItemRef(driveRef, "01LRCMNGPET3QFUL2ZVNHJFKMYBJOJMHBB" as DriveItemId); // <== This is a fake ID
		const result = await tryDeleteDriveItem(fakeDriveItem);
		expect(result).toBe(false);
	});

	it("throws an error with an invalid ID", async () => {
		const driveRef = getDefaultDriveRef();
		const invalidDriveItem = createDriveItemRef(driveRef, "invalid-id" as DriveItemId);
		await expect(async () => {
			await tryDeleteDriveItem(invalidDriveItem);
		}).rejects.toThrow();
	});
});
