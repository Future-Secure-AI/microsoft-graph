import { describe, expect, it } from "vitest";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemRef } from "../../services/driveItem.js";
import { generateTempFileName } from "../../services/temporaryFiles.js";
import deleteDriveItem from "../driveItem/deleteDriveItem.js";
import createFolder from "./createFolder.js";

describe("createFolder", () => {
    it("can create root folder", async () => {
        const folderName = generateTempFileName();
        const folder = await createFolder(defaultDriveRef, folderName);
        const folderRef = driveItemRef(defaultDriveRef, folder.id);

        expect(folder.webUrl?.endsWith(`/${folderName}`)).toBeTruthy();

        await deleteDriveItem(folderRef);
    });

    it("can create sub-folder", async () => {
        const topFolderName = generateTempFileName();
        console.debug(`Creating top-level folder ${topFolderName}...`);
        const topFolder = await createFolder(defaultDriveRef, topFolderName);
        const topFolderRef = driveItemRef(defaultDriveRef, topFolder.id);

        try {
            const bottomFolderName = generateTempFileName();
            console.debug(`Creating second-level folder ${bottomFolderName}...`);
            const bottomFolder = await createFolder(topFolderRef, bottomFolderName);

            expect(bottomFolder.webUrl?.endsWith(`/${topFolderName}/${bottomFolderName}`)).toBeTruthy();
        } finally {
            await deleteDriveItem(topFolderRef);
        }
    });
});