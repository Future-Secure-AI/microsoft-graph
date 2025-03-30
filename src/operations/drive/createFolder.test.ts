import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import deleteDriveItem from "../driveItem/deleteDriveItem.ts";
import createFolder from "./createFolder.ts";

describe("createFolder", () => {
	it("can create root folder", async () => {
		const driveRef = getDefaultDriveRef();
		const folderName = generateTempFileName();
		const folder = await createFolder(driveRef, folderName);

		expect(folder.webUrl?.endsWith(`/${folderName}`)).toBeTruthy();

		await deleteDriveItem(folder);
	});

	it("can create sub-folder", async () => {
		const driveRef = getDefaultDriveRef();
		const parentFolderName = generateTempFileName("parent");
		console.debug(`Creating parent folder ${parentFolderName}...`);
		const parentFolder = await createFolder(driveRef, parentFolderName);

		console.debug(`Created parent folder ${parentFolder.webUrl}...`);

		try {
			const childFolderName = generateTempFileName("child");
			console.debug(`Creating child folder ${childFolderName}...`);
			const childFolder = await createFolder(parentFolder, childFolderName);
			console.debug(`Created child folder ${childFolder.webUrl}...`);

			expect(childFolder.webUrl).contains(`/${parentFolderName}/${childFolderName}`);
		} finally {
			await deleteDriveItem(parentFolder);
		}
	});
});
