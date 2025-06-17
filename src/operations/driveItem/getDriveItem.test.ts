import { describe, expect, it } from "vitest";
import type { DriveItemId, DriveItemRef } from "../../models/DriveItem.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createFolder from "../drive/createFolder.ts";
import getDriveItem from "./getDriveItem.ts";

describe("getDriveItem", () => {
	const defaultDriveRef = getDefaultDriveRef();

	it("can retrieve an existing folder", async () => {
		const folderName = generateTempFileName();
		const folder = await createFolder(defaultDriveRef, folderName);
		try {
			const retrievedFolder = await getDriveItem(folder);

			expect(retrievedFolder.id).toBe(folder.id);
			expect(retrievedFolder.name).toBe(folderName);
		} finally {
			await tryDeleteDriveItem(folder);
		}
	});

	it("throws an error when trying to retrieve a non-existent item", async () => {
		const nonExistentItemRef: DriveItemRef = {
			...defaultDriveRef,
			itemId: "non-existent-item-id" as DriveItemId,
		};

		await expect(getDriveItem(nonExistentItemRef)).rejects.toThrow();
	});
});
