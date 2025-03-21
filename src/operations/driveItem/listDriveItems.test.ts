import { describe, expect, it } from "vitest";
import { driveItemPath, driveItemRef, rootDriveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import createFolder from "../drive/createFolder.ts";
import listDriveItems from "./listDriveItems.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";

describe("listDriveItems", () => {
    it("can list items in the root folder", { timeout: 10000 }, async () => {
        const items = await listDriveItems(getDefaultDriveRef(), rootDriveItemPath);

        expect(items.value).toBeInstanceOf(Array);
    });

    it("can list items in a folder", async () => {
        const folderName = generateTempFileName();
        const folder = await createFolder(getDefaultDriveRef(), folderName);
        const folderPath = driveItemPath(folderName);
        const folderRef = driveItemRef(getDefaultDriveRef(), folder.id);

        const items = await listDriveItems(getDefaultDriveRef(), folderPath);

        expect(items.value).toBeInstanceOf(Array);

        await deleteDriveItemWithRetry(folderRef);
    });

    it("throws an error when trying to list items in a non-existent folder", async () => {
        const nonExistentFolderPath = driveItemPath("non-existent-folder");

        await expect(listDriveItems(getDefaultDriveRef(), nonExistentFolderPath)).rejects.toThrow();
    });
});
