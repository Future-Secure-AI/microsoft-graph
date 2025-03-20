import { describe, expect, it } from "vitest";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { deleteDriveItemWithRetry } from "../../tasks/deleteDriveItemWithRetry.ts";
import createFolder from "../drive/createFolder.ts";
import getDriveItemByPath from "./getDriveItemByPath.ts";

describe("getDriveItemByPath", () => {
    it("can retrieve an existing folder by path", async () => {
        const folderName = generateTempFileName();
        const folder = await createFolder(defaultDriveRef, folderName);
        const folderPath = driveItemPath(folderName);
        const folderRef = driveItemRef(defaultDriveRef, folder.id);

        const retrievedFolder = await getDriveItemByPath(defaultDriveRef, folderPath);

        expect(retrievedFolder.id).toBe(folder.id);
        expect(retrievedFolder.name).toBe(folderName);

        await deleteDriveItemWithRetry(folderRef);
    });

    it("throws an error when trying to retrieve a non-existent item by path", async () => {
        const nonExistentItemPath = driveItemPath("non-existent-item-path");

        await expect(getDriveItemByPath(defaultDriveRef, nonExistentItemPath)).rejects.toThrow();
    });
});
