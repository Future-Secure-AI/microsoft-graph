import { describe, expect, it } from "vitest";
import type { DriveItemId } from "../../models/DriveItemId.js";
import type { DriveItemRef } from "../../models/DriveItemRef.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemRef } from "../../services/driveItem.js";
import { generateTempFileName } from "../../services/temporaryFiles.js";
import createFolder from "../drive/createFolder.js";
import deleteDriveItem from "./deleteDriveItem.js";
import getDriveItem from "./getDriveItem.js";

describe("deleteDriveItem", () => {
    it("can delete an existing folder", async () => {
        const folderName = generateTempFileName();
        const folder = await createFolder(defaultDriveRef, folderName);
        const folderRef = driveItemRef(defaultDriveRef, folder.id);

        await deleteDriveItem(folderRef);

        await expect(getDriveItem(folderRef)).rejects.toThrow();
    });

    it("throws an error when trying to delete a non-existent item", async () => {
        const nonExistentItemRef: DriveItemRef = {
            ...defaultDriveRef,
            itemId: "non-existent-item-id" as DriveItemId
        };

        await expect(deleteDriveItem(nonExistentItemRef)).rejects.toThrow();
    });
});
