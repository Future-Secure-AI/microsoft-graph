import { describe, expect, it } from "vitest";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemPath, driveItemRef, rootDriveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { deleteDriveItemWithRetry } from "../../tasks/deleteDriveItemWithRetry.ts";
import createFolder from "../drive/createFolder.ts";
import listDriveItems from "./listDriveItems.ts";

describe("listDriveItems", () => {
    it("can list items in the root folder", async () => {
        const items = await listDriveItems(defaultDriveRef, rootDriveItemPath);

        expect(items.value).toBeInstanceOf(Array);
    });

    it("can list items in a folder", async () => {
        const folderName = generateTempFileName();
        const folder = await createFolder(defaultDriveRef, folderName);
        const folderPath = driveItemPath(folderName);
        const folderRef = driveItemRef(defaultDriveRef, folder.id);

        const items = await listDriveItems(defaultDriveRef, folderPath);

        expect(items.value).toBeInstanceOf(Array);

        await deleteDriveItemWithRetry(folderRef);
    });

    it("throws an error when trying to list items in a non-existent folder", async () => {
        const nonExistentFolderPath = driveItemPath("non-existent-folder");

        await expect(listDriveItems(defaultDriveRef, nonExistentFolderPath)).rejects.toThrow();
    });
});
