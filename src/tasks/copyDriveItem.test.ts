import { describe, expect, it } from "vitest";
import createDriveItem from "../operations/driveItem/createDriveItem.ts";
import getDriveItemByPath from "../operations/driveItem/getDriveItemByPath.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath } from "../services/driveItem.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import copyDriveItem from "./copyDriveItem.ts";
import tryDeleteDriveItem from "./tryDeleteDriveItem.ts";

describe("copyDriveItem", () => {
	it("successfully copies a file from source to destination", async () => {
		const sourceFileName = generateTempFileName("txt");
		const destFileName = generateTempFileName("txt");
		const sourcePath = driveItemPath(sourceFileName);
		const destPath = driveItemPath(destFileName);
		const driveRef = getDefaultDriveRef();
		const testContent = "Test content for copy operation";

		const sourceFile = await createDriveItem(driveRef, sourcePath, "text/plain", new TextEncoder().encode(testContent));

		try {
			const copiedFile = await copyDriveItem(sourceFile, driveRef, destPath);

			expect(copiedFile).toBeTruthy();
			expect(copiedFile.name).toBe(destFileName);

			const fetchedFile = await getDriveItemByPath(driveRef, destPath);
			expect(fetchedFile).toBeTruthy();
			expect(fetchedFile.name).toBe(destFileName);

			await tryDeleteDriveItem(copiedFile);
		} finally {
			await tryDeleteDriveItem(sourceFile);
		}
	});
});
