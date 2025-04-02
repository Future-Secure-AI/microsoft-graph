import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createFolder from "../drive/createFolder.ts";
import getDriveItemByPath from "./getDriveItemByPath.ts";

describe("getDriveItemByPath", () => {
	it("can retrieve an existing folder by path", async () => {
		const folderName = generateTempFileName();
		const folder = await createFolder(getDefaultDriveRef(), folderName);
		const folderPath = driveItemPath(folderName);

		const retrievedFolder = await getDriveItemByPath(getDefaultDriveRef(), folderPath);

		expect(retrievedFolder.id).toBe(folder.id);
		expect(retrievedFolder.name).toBe(folderName);

		await tryDeleteDriveItem(folder);
	});

	it("throws an error when trying to retrieve a non-existent item by path", async () => {
		const nonExistentItemPath = driveItemPath("non-existent-item-path");

		await expect(getDriveItemByPath(getDefaultDriveRef(), nonExistentItemPath)).rejects.toThrow();
	});
});
