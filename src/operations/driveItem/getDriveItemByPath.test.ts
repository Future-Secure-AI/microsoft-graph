import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath, rootDriveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createFolder from "../drive/createFolder.ts";
import getDriveItemByPath from "./getDriveItemByPath.ts";

describe("getDriveItemByPath", () => {
	it("can retrieve folder by path", async () => {
		const driveRef = getDefaultDriveRef();
		const folderName = generateTempFileName();
		const folder = await createFolder(driveRef, folderName);
		try {
			const folderPath = driveItemPath(folderName);

			const retrievedFolder = await getDriveItemByPath(driveRef, folderPath);

			expect(retrievedFolder.id).toBe(folder.id);
			expect(retrievedFolder.name).toBe(folderName);
		} finally {
			await tryDeleteDriveItem(folder);
		}
	});

	it("can retrieve root by path", async () => {
		const driveRef = getDefaultDriveRef();

		const retrievedFolder = await getDriveItemByPath(driveRef, rootDriveItemPath);

		expect(retrievedFolder.name).toBe("root");
	});

	it("throws an error when trying to retrieve a non-existent item by path", async () => {
		const nonExistentItemPath = driveItemPath("non-existent-item-path");

		await expect(getDriveItemByPath(getDefaultDriveRef(), nonExistentItemPath)).rejects.toThrow();
	});

	it("can retrieve item by path using a DriveItemRef as parentRef", async () => {
		const driveRef = getDefaultDriveRef();
		const folderName = generateTempFileName();
		const folder = await createFolder(driveRef, folderName);
		try {
			// Use the folder as the parentRef (DriveItemRef)
			const subFolderName = generateTempFileName();
			const subFolder = await createFolder(folder, subFolderName);
			try {
				const subFolderPath = driveItemPath(subFolderName);
				const retrievedSubFolder = await getDriveItemByPath(folder, subFolderPath);
				expect(retrievedSubFolder.id).toBe(subFolder.id);
				expect(retrievedSubFolder.name).toBe(subFolderName);
			} finally {
				await tryDeleteDriveItem(subFolder);
			}
		} finally {
			await tryDeleteDriveItem(folder);
		}
	});

	it("can retrieve root by path using a DriveItemRef as parentRef (should return itself)", async () => {
		const driveRef = getDefaultDriveRef();
		const folderName = generateTempFileName();
		const folder = await createFolder(driveRef, folderName);
		try {
			const retrieved = await getDriveItemByPath(folder, rootDriveItemPath);
			expect(retrieved.id).toBe(folder.id);
			expect(retrieved.name).toBe(folderName);
		} finally {
			await tryDeleteDriveItem(folder);
		}
	});
});
