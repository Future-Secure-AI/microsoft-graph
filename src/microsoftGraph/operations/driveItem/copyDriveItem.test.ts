import { describe, expect, it } from "vitest";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemPath, driveItemRef } from "../../services/driveItem.js";
import { sleep } from "../../services/sleep.js";
import { generateTempFileName } from "../../services/temporaryFiles.js";
import { deleteDriveItemWithRetry } from "../../tasks/deleteDriveItemWithRetry.js";
import createFolder from "../drive/createFolder.js";
import copyDriveItem from "./copyDriveItem.js";
import getDriveItemByPath from "./getDriveItemByPath.js";

describe("copyDriveItem", () => {
    it("can copy an item to a new folder", async () => {
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

            await sleep(500); // Copy doesn't happen immediately

            const copyFolder = await getDriveItemByPath(defaultDriveRef, copyPath);
            expect(copyFolder.webUrl?.endsWith(copyPath)).toBeTruthy();
        } finally {
            await deleteDriveItemWithRetry(srcFolderRef);
            await deleteDriveItemWithRetry(dstFolderRef);
        }
    });
});