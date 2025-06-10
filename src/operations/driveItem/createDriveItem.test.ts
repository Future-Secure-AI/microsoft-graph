import { describe, expect, it } from "vitest";
import type { DriveItemRef } from "../../models/DriveItem.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createDriveItem from "./createDriveItem.ts";
import getDriveItemContent from "./getDriveItemContent.ts";

const sampleContentType = "text/plain";
const sampleContent = new TextEncoder().encode("Sample content").buffer;

describe("createDriveItem", () => {
	it("creates a new drive item and verifies its content", async () => {
		const driveRef = getDefaultDriveRef();
		const itemPath = driveItemPath(generateTempFileName("txt"));

		let createdItem: DriveItemRef | null = null;
		try {
			createdItem = await createDriveItem(driveRef, itemPath, sampleContentType, sampleContent);

			expect(createdItem).toHaveProperty("id");
			expect(createdItem).toHaveProperty("name", itemPath.split("/").pop());

			const content = await getDriveItemContent(createdItem);
			expect(content).toBeInstanceOf(ArrayBuffer);

			const originalArray = new Uint8Array(sampleContent);
			const retrievedArray = new Uint8Array(content);
			expect(retrievedArray).toEqual(originalArray);
		} finally {
			if (createdItem) {
				await tryDeleteDriveItem(createdItem);
			}
		}
	});
});
