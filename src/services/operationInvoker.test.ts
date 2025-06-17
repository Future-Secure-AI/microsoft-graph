import { describe, expect, it } from "vitest";
import deleteDriveItem from "../operations/driveItem/deleteDriveItem.ts";
import closeWorkbookSession from "../operations/workbookSession/closeWorkbookSession.ts";
import createWorkbookAndStartSession from "../tasks/createWorkbookAndStartSession.ts";
import tryDeleteDriveItem from "../tasks/tryDeleteDriveItem.ts";
import { getDefaultDriveRef } from "./drive.ts";
import { driveItemPath } from "./driveItem.ts";
import { generateTempFileName } from "./temporaryFiles.ts";
import getDriveItemByPath from "../operations/driveItem/getDriveItemByPath.ts";

const lockedErrorPattern = /locked.*Request was retried 3 times/i;
const badRequestErrorPattern = /not be found/i;

describe("operation", () => {
	it("handles locked with exception", async () => {
		const driveRef = getDefaultDriveRef();

		const itemPath = driveItemPath(generateTempFileName("xlsx"));
		const workbook = await createWorkbookAndStartSession(driveRef, itemPath);
		try {
			await expect(deleteDriveItem(workbook)).rejects.toThrowError(lockedErrorPattern);
		} finally {
			await closeWorkbookSession(workbook);
			await tryDeleteDriveItem(workbook);
		}
	});
	it("handles not bad request without retry", async () => {
		const driveRef = getDefaultDriveRef();

		const itemPath = driveItemPath(generateTempFileName("xlsx"));
		await expect(getDriveItemByPath(driveRef, itemPath)).rejects.toThrowError(badRequestErrorPattern);
	});
});
