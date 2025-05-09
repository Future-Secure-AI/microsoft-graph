import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import existsDriveItem from "./existsDriveItem.ts";

describe("existsDriveItem", () => {
	it("can detect file exists", { timeout: 20000 }, async () => {
		const driveRef = getDefaultDriveRef();
		const workbookPath = driveItemPath(generateTempFileName("xlsx"));
		const workbook = await createWorkbook(driveRef, workbookPath);

		try {
			const exists = await existsDriveItem(driveRef, workbookPath);
			expect(exists).toBe(true);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});

	it("can detect file does not exists", { timeout: 20000 }, async () => {
		const driveRef = getDefaultDriveRef();
		const workbookPath = driveItemPath(generateTempFileName("xlsx"));

		const exists = await existsDriveItem(driveRef, workbookPath);
		expect(exists).toBe(false);
	});
});
