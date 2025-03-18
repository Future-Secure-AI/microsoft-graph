import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import type { DriveItemId } from "../../models/DriveItemId.js";
import type { DriveItemRef } from "../../models/DriveItemRef.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemRef, generateTempFileName } from "../../services/driveItem.js";
import createFolder from "../drive/createFolder.js";
import deleteDriveItem from "./deleteDriveItem.js";
import getDriveItem from "./getDriveItem.js";

describe("getDriveItem", () => {
    it("can retrieve an existing folder", async () => {
        const folderName = generateTempFileName();
        const folder = await executeSingle(createFolder(defaultDriveRef, folderName));
        const folderRef = driveItemRef(defaultDriveRef, folder.id);

        const retrievedFolder = await executeSingle(getDriveItem(folderRef));

        expect(retrievedFolder.id).toBe(folder.id);
        expect(retrievedFolder.name).toBe(folderName);

        await executeSingle(deleteDriveItem(folderRef));
    });

    it("throws an error when trying to retrieve a non-existent item", async () => {
        const nonExistentItemRef: DriveItemRef = {
            ...defaultDriveRef,
            itemId: "non-existent-item-id" as DriveItemId
        };

        await expect(executeSingle(getDriveItem(nonExistentItemRef))).rejects.toThrow();
    });
});
