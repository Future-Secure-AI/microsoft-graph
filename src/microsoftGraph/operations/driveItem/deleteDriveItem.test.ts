import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
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
        const folder = await executeSingle(createFolder(defaultDriveRef, folderName));
        const folderRef = driveItemRef(defaultDriveRef, folder.id);

        await executeSingle(deleteDriveItem(folderRef));

        await expect(executeSingle(getDriveItem(folderRef))).rejects.toThrow();
    });

    it("throws an error when trying to delete a non-existent item", async () => {
        const nonExistentItemRef: DriveItemRef = {
            ...defaultDriveRef,
            itemId: "non-existent-item-id" as DriveItemId
        };

        await expect(executeSingle(deleteDriveItem(nonExistentItemRef))).rejects.toThrow();
    });
});
