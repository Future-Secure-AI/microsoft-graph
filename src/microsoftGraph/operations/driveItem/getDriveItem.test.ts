import { describe, expect, it } from "vitest";
import type { DriveItemId } from "../../models/DriveItemId.js";
import type { DriveItemRef } from "../../models/DriveItemRef.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemRef } from "../../services/driveItem.js";
import { generateTempFileName } from "../../services/temporaryFiles.js";
import { deleteDriveItemWithRetry } from "../../tasks/deleteDriveItemWithRetry.js";
import createFolder from "../drive/createFolder.js";
import getDriveItem from "./getDriveItem.js";

describe("getDriveItem", () => {
    it("can retrieve an existing folder", async () => {
        const folderName = generateTempFileName();
        const folder = await createFolder(defaultDriveRef, folderName);
        const folderRef = driveItemRef(defaultDriveRef, folder.id);

        const retrievedFolder = await getDriveItem(folderRef);

        expect(retrievedFolder.id).toBe(folder.id);
        expect(retrievedFolder.name).toBe(folderName);

        await deleteDriveItemWithRetry(folderRef);
    });

    it("throws an error when trying to retrieve a non-existent item", async () => {
        const nonExistentItemRef: DriveItemRef = {
            ...defaultDriveRef,
            itemId: "non-existent-item-id" as DriveItemId
        };

        await expect(getDriveItem(nonExistentItemRef)).rejects.toThrow();
    });
});
