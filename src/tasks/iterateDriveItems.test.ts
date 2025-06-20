import { describe, expect, it } from "vitest";
import createFolder from "../operations/drive/createFolder.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { iterateToArray } from "../services/iteration.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import iterateDriveItems from "./iterateDriveItems.ts";
import tryDeleteDriveItem from "./tryDeleteDriveItem.ts";

describe("iterateDriveItems", () => {
	it("can list items in the root folder", async () => {
		const driveRef = getDefaultDriveRef();
		const items = await iterateToArray(iterateDriveItems(driveRef));

		console.debug(
			"Drive items:",
			items.map((x) => x.name),
		);
		expect(items).toBeInstanceOf(Array);
	});

	it("can list items in multiple pages", async () => {
		const driveRef = getDefaultDriveRef();
		const items = await iterateToArray(iterateDriveItems(driveRef, 10));

		expect(items).toBeInstanceOf(Array);
	});

	it("can list items in a folder", async () => {
		const driveRef = getDefaultDriveRef();
		const folder = await createFolder(driveRef, generateTempFileName());

		try {
			const items = await iterateToArray(iterateDriveItems(folder));

			expect(items).toBeInstanceOf(Array);
		} finally {
			await tryDeleteDriveItem(folder);
		}
	});
});
