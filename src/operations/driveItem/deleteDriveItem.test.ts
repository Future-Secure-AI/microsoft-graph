import { describe, expect, it } from "vitest";
import type { DriveItemId, DriveItemRef } from "../../models/DriveItem.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import createFolder from "../drive/createFolder.ts";
import deleteDriveItem from "./deleteDriveItem.ts";
import getDriveItem from "./getDriveItem.ts";

describe("deleteDriveItem", () => {
	it("can delete an existing folder", async () => {
		const folderName = generateTempFileName();
		const driveRef = getDefaultDriveRef();
		const folder = await createFolder(driveRef, folderName);

		await deleteDriveItem(folder);

		await expect(getDriveItem(folder)).rejects.toThrow();
	});

	it("throws an error when trying to delete a non-existent item", async () => {
		const driveRef = getDefaultDriveRef();

		const nonExistentItemRef: DriveItemRef = {
			...driveRef,
			itemId: "non-existent-item-id" as DriveItemId,
		};

		await expect(deleteDriveItem(nonExistentItemRef)).rejects.toThrow();
	});
});
