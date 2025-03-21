import { describe, expect, it } from "vitest";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import createFolder from "../drive/createFolder.ts";
import copyDriveItem from "./copyDriveItem.ts";
import getDriveItemByPath from "./getDriveItemByPath.ts";

describe("copyDriveItem", () => {
    it("can copy an item to a new folder", { timeout: 10000 }, async () => {
        const srcFolderName = generateTempFileName();
        const srcFolder = await createFolder(defaultDriveRef, srcFolderName);
        const srcFolderRef = driveItemRef(defaultDriveRef, srcFolder.id);

        const dstFolderName = generateTempFileName();
        const dstFolder = await createFolder(defaultDriveRef, dstFolderName);
        const dstFolderRef = driveItemRef(defaultDriveRef, dstFolder.id);

        try {
            const copiedItemName = `${srcFolderName}-copy`;
            await copyDriveItem(srcFolderRef, dstFolderRef, copiedItemName);

            const copyPath = driveItemPath(dstFolderName, copiedItemName);

            const copyFolder = await getDriveItemByPath(defaultDriveRef, copyPath);
            expect(copyFolder.webUrl?.endsWith(copyPath)).toBeTruthy();
        } finally {
            await deleteDriveItemWithRetry(srcFolderRef);
            await deleteDriveItemWithRetry(dstFolderRef);
        }
    });
});