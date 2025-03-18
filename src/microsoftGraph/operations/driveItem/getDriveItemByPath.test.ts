import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemPath, driveItemRef, generateTempFileName } from "../../services/drivePath.js";
import createFolder from "../drive/createFolder.js";
import deleteDriveItem from "./deleteDriveItem.js";
import getDriveItemByPath from "./getDriveItemByPath.js";

describe("getDriveItemByPath", () => {
    it("can retrieve an existing folder by path", async () => {
        const folderName = generateTempFileName();
        const folder = await executeSingle(createFolder(defaultDriveRef, folderName));
        const folderPath = driveItemPath(folderName);
        const folderRef = driveItemRef(defaultDriveRef, folder.id);

        const retrievedFolder = await executeSingle(getDriveItemByPath(defaultDriveRef, folderPath));

        expect(retrievedFolder.id).toBe(folder.id);
        expect(retrievedFolder.name).toBe(folderName);

        await executeSingle(deleteDriveItem(folderRef));
    });

    it("throws an error when trying to retrieve a non-existent item by path", async () => {
        const nonExistentItemPath = driveItemPath("non-existent-item-path");

        await expect(executeSingle(getDriveItemByPath(defaultDriveRef, nonExistentItemPath))).rejects.toThrow();
    });
});
