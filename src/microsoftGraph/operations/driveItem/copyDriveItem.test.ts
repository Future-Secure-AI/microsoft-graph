import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemPath, driveItemRef, generateTempFileName } from "../../services/driveItem.js";
import { sleep } from "../../services/sleep.js";
import createFolder from "../drive/createFolder.js";
import copyDriveItem from "./copyDriveItem.js";
import deleteDriveItem from "./deleteDriveItem.js";
import getDriveItemByPath from "./getDriveItemByPath.js";

describe("copyDriveItem", () => {
    it("can copy an item to a new folder", async () => {
        const srcFolderName = generateTempFileName();
        const srcFolder = await executeSingle(createFolder(defaultDriveRef, srcFolderName));
        const srcFolderRef = driveItemRef(defaultDriveRef, srcFolder.id);

        const dstFolderName = generateTempFileName();
        const dstFolder = await executeSingle(createFolder(defaultDriveRef, dstFolderName));
        const dstFolderRef = driveItemRef(defaultDriveRef, dstFolder.id);

        try {
            const copiedItemName = `${srcFolderName}-copy`;
            await executeSingle(copyDriveItem(srcFolderRef, dstFolderRef, copiedItemName));

            const copyPath = driveItemPath(dstFolderName, copiedItemName);

            await sleep(1000); // Copy doesn't happen immediately

            const copyFolder = await executeSingle(getDriveItemByPath(defaultDriveRef, copyPath));
            expect(copyFolder.webUrl?.endsWith(copyPath)).toBeTruthy();
        } finally {
            await executeSingle(deleteDriveItem(srcFolderRef));
            await executeSingle(deleteDriveItem(dstFolderRef));
        }
    });
});