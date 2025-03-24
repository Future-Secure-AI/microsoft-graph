import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath, } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import createFolder from "../drive/createFolder.ts";
import copyDriveItem from "./copyDriveItem.ts";
import getDriveItemByPath from "./getDriveItemByPath.ts";

describe("copyDriveItem", () => {
    it("can copy an item to a new folder", { timeout: 10000 }, async () => {
        const driveRef = getDefaultDriveRef();

        const srcFolderName = generateTempFileName();
        const srcFolder = await createFolder(driveRef, srcFolderName);

        const dstFolderName = generateTempFileName();
        const dstFolder = await createFolder(driveRef, dstFolderName);

        try {
            const copiedItemName = `${srcFolderName}-copy`;
            await copyDriveItem(srcFolder, dstFolder, copiedItemName);

            const copyPath = driveItemPath(dstFolderName, copiedItemName);

            const copyFolder = await getDriveItemByPath(driveRef, copyPath);
            expect(copyFolder.webUrl?.endsWith(copyPath)).toBeTruthy();
        } finally {
            await deleteDriveItemWithRetry(srcFolder);
            await deleteDriveItemWithRetry(dstFolder);
        }
    });
});