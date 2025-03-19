import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemPath, driveItemRef, rootDriveItemPath } from "../../services/driveItem.js";
import { generateTempFileName } from "../../services/temporaryFiles.js";
import { deleteDriveItemWithRetry } from "../../tasks/waitAndDeleteDriveItem.js";
import createFolder from "../drive/createFolder.js";
import listDriveItems from "./listDriveItems.js";

describe("listDriveItems", () => {
    it("can list items in the root folder", async () => {
        const items = await executeSingle(listDriveItems(defaultDriveRef, rootDriveItemPath));

        expect(items.value).toBeInstanceOf(Array);
    });

    it("can list items in a folder", async () => {
        const folderName = generateTempFileName();
        const folder = await executeSingle(createFolder(defaultDriveRef, folderName));
        const folderPath = driveItemPath(folderName);
        const folderRef = driveItemRef(defaultDriveRef, folder.id);

        const items = await executeSingle(listDriveItems(defaultDriveRef, folderPath));

        expect(items.value).toBeInstanceOf(Array);

        await deleteDriveItemWithRetry(folderRef);
    });

    it("throws an error when trying to list items in a non-existent folder", async () => {
        const nonExistentFolderPath = driveItemPath("non-existent-folder");

        await expect(executeSingle(listDriveItems(defaultDriveRef, nonExistentFolderPath))).rejects.toThrow();
    });
});
