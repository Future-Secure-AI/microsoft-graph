import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createFolder from "../drive/createFolder.ts";
import getDriveItemByPath from "./getDriveItemByPath.ts";
import initiateCopyDriveItem from "./initiateCopyDriveItem.ts";

describe("initiateCopyDriveItem", () => {
	it("can copy an item to a new folder", async () => {
		const driveRef = getDefaultDriveRef();

		const srcFolderName = generateTempFileName();
		const srcFolder = await createFolder(driveRef, srcFolderName);

		const dstFolderName = generateTempFileName();
		const dstFolder = await createFolder(driveRef, dstFolderName);

		try {
			const copiedItemName = `${srcFolderName}-copy`;
			await initiateCopyDriveItem(srcFolder, dstFolder, copiedItemName);

			const copyPath = driveItemPath(dstFolderName, copiedItemName);

			const copyFolder = await getDriveItemByPath(driveRef, copyPath);
			expect(copyFolder.webUrl?.endsWith(copyPath)).toBeTruthy();
		} finally {
			await tryDeleteDriveItem(srcFolder);
			await tryDeleteDriveItem(dstFolder);
		}
	});

	it("can copy an item to the drive root", async () => {
		const driveRef = getDefaultDriveRef();

		const srcFolderName = generateTempFileName();
		const srcFolder = await createFolder(driveRef, srcFolderName);

		try {
			const copiedItemName = `${srcFolderName}-root-copy`;
			await initiateCopyDriveItem(srcFolder, driveRef, copiedItemName);

			const copyPath = driveItemPath(copiedItemName);
			const copiedFolder = await getDriveItemByPath(driveRef, copyPath);

			expect(copiedFolder).toBeTruthy();
			expect(copiedFolder.name).toBe(copiedItemName);
			expect(copiedFolder.webUrl?.endsWith(copiedItemName)).toBeTruthy();

			await tryDeleteDriveItem(copiedFolder);
		} finally {
			await tryDeleteDriveItem(srcFolder);
		}
	});
});
