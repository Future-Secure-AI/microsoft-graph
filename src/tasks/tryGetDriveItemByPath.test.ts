import { describe, expect, it } from "vitest";
import createFolder from "../operations/drive/createFolder.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath, rootDriveItemPath } from "../services/driveItem.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import tryDeleteDriveItem from "./tryDeleteDriveItem.ts";
import tryGetDriveItemByPath from "./tryGetDriveItemByPath.ts";

describe("tryGetDriveItemByPath", () => {
	it("returns the drive item for an existing folder", async () => {
		const driveRef = getDefaultDriveRef();
		const folderName = generateTempFileName();
		const folder = await createFolder(driveRef, folderName);
		try {
			const folderPath = driveItemPath(folderName);
			const retrieved = await tryGetDriveItemByPath(driveRef, folderPath);
			expect(retrieved).not.toBeNull();
			expect(retrieved?.id).toBe(folder.id);
			expect(retrieved?.name).toBe(folderName);
		} finally {
			await tryDeleteDriveItem(folder);
		}
	});

	it("returns the root drive item", async () => {
		const driveRef = getDefaultDriveRef();
		const retrieved = await tryGetDriveItemByPath(driveRef, rootDriveItemPath);
		expect(retrieved).not.toBeNull();
		expect(retrieved?.name).toBe("root");
	});

	it("returns null for a non-existent item", async () => {
		const driveRef = getDefaultDriveRef();
		const nonExistentPath = driveItemPath("non-existent-item-path");
		const retrieved = await tryGetDriveItemByPath(driveRef, nonExistentPath);
		expect(retrieved).toBeNull();
	});
});
