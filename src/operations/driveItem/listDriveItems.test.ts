import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createFolder from "../drive/createFolder.ts";
import listDriveItems from "./listDriveItems.ts";

describe("listDriveItemChildren", () => {
	it("can list items in the root folder", async () => {
		const driveRef = getDefaultDriveRef();
		const { items } = await listDriveItems(driveRef);

		console.debug(
			"Drive items:",
			items.map((x) => x.name),
		);
		expect(items).toBeInstanceOf(Array);
	});

	it("can list items in a folder", async () => {
		const driveRef = getDefaultDriveRef();
		const folder = await createFolder(driveRef, generateTempFileName());

		try {
			const { items } = await listDriveItems(folder);

			expect(items).toBeInstanceOf(Array);
		} finally {
			await tryDeleteDriveItem(folder);
		}
	});
});
