import { describe, expect, it } from "vitest";
import type { DriveItemId } from "../../models/DriveItemId.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemRef } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import createFolder from "../drive/createFolder.ts";
import getDriveItem from "./getDriveItem.ts";

describe("getDriveItem", () => {
    it("can retrieve an existing folder", { timeout: 10000 }, async () => {
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
