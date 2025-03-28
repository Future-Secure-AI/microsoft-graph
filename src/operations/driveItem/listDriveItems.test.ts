import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import createFolder from "../drive/createFolder.ts";
import listDriveItems from "./listDriveItems.ts";

describe("listDriveItems", () => {
	it("can list items in the root folder", { timeout: 10000 }, async () => {
		const driveRef = getDefaultDriveRef();
		const items = await listDriveItems(driveRef);

		expect(items).toBeInstanceOf(Array);
	});

	it("can list items in a folder", async () => {
		const driveRef = getDefaultDriveRef();
		const folder = await createFolder(driveRef, generateTempFileName());

		try {
			const items = await listDriveItems(folder);

			expect(items).toBeInstanceOf(Array);
		} finally {
			await deleteDriveItemWithRetry(folder);
		}
	});
});
