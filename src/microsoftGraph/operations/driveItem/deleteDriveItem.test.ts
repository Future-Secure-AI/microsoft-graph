import { describe, expect, it } from "vitest";
import type { DriveItemId } from "../../models/DriveItemId.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemRef } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import createFolder from "../drive/createFolder.ts";
import deleteDriveItem from "./deleteDriveItem.ts";
import getDriveItem from "./getDriveItem.ts";

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
