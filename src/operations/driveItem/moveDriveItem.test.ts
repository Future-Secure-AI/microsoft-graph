import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createFolder from "../drive/createFolder.ts";
import getDriveItemByPath from "./getDriveItemByPath.ts";
import moveDriveItem from "./moveDriveItem.ts";

describe("moveDriveItem", () => {
	it("can move an item to a new folder", async () => {
		const driveRef = getDefaultDriveRef();

		const srcFolderName = generateTempFileName();
		const srcFolder = await createFolder(driveRef, srcFolderName);

		const dstFolderName = generateTempFileName();
		const dstFolder = await createFolder(driveRef, dstFolderName);

		try {
			const itemToMoveName = generateTempFileName();
			const itemToMove = await createFolder(srcFolder, itemToMoveName);

			await moveDriveItem(itemToMove, dstFolder, itemToMoveName);

			const movedItemPath = driveItemPath(dstFolderName, itemToMoveName);
			const movedItem = await getDriveItemByPath(driveRef, movedItemPath);

			expect(movedItem).toBeTruthy();
			expect(movedItem.name).toBe(itemToMoveName);
			expect(movedItem.webUrl?.endsWith(movedItemPath)).toBeTruthy();

			try {
				const originalItemPath = driveItemPath(srcFolderName, itemToMoveName);
				await getDriveItemByPath(driveRef, originalItemPath);
				throw new Error("Item should not exist in the original location");
			} catch (error) {
				expect(error).toBeTruthy();
			}
		} finally {
			await tryDeleteDriveItem(srcFolder);
			await tryDeleteDriveItem(dstFolder);
		}
	});

	it("can move an item to the drive root", async () => {
		const driveRef = getDefaultDriveRef();

		const srcFolderName = generateTempFileName("src");
		const srcFolder = await createFolder(driveRef, srcFolderName);

		try {
			const itemToMoveName = generateTempFileName("move");
			const itemToMove = await createFolder(srcFolder, itemToMoveName);

			await moveDriveItem(itemToMove, driveRef, itemToMoveName);

			const movedItemPath = driveItemPath(itemToMoveName);
			const movedItem = await getDriveItemByPath(driveRef, movedItemPath);

			expect(movedItem).toBeTruthy();
			expect(movedItem.name).toBe(itemToMoveName);
			expect(movedItem.webUrl?.endsWith(itemToMoveName)).toBeTruthy();

			await tryDeleteDriveItem(movedItem);
		} finally {
			await tryDeleteDriveItem(srcFolder);
		}
	});

	it("can rename an item while moving it", async () => {
		const driveRef = getDefaultDriveRef();

		const srcFolderName = generateTempFileName();
		const srcFolder = await createFolder(driveRef, srcFolderName);

		const dstFolderName = generateTempFileName();
		const dstFolder = await createFolder(driveRef, dstFolderName);

		try {
			const originalName = generateTempFileName();
			const itemToMove = await createFolder(srcFolder, originalName);

			const newName = `${originalName}-renamed`;

			await moveDriveItem(itemToMove, dstFolder, newName);

			const movedItemPath = driveItemPath(dstFolderName, newName);
			const movedItem = await getDriveItemByPath(driveRef, movedItemPath);

			expect(movedItem).toBeTruthy();
			expect(movedItem.name).toBe(newName);
			expect(movedItem.webUrl?.endsWith(movedItemPath)).toBeTruthy();

			try {
				const originalItemPath = driveItemPath(srcFolderName, originalName);
				await getDriveItemByPath(driveRef, originalItemPath);
				throw new Error("Item should not exist in the original location");
			} catch (error) {
				expect(error).toBeTruthy();
			}
		} finally {
			await tryDeleteDriveItem(srcFolder);
			await tryDeleteDriveItem(dstFolder);
		}
	});
});
