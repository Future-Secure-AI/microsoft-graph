import { describe, expect, it } from "vitest";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemRef } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import deleteDriveItem from "../driveItem/deleteDriveItem.ts";
import createFolder from "./createFolder.ts";

describe("createFolder", () => {
    it("can create root folder", { timeout: 10000 }, async () => {
        const folderName = generateTempFileName();
        const folder = await createFolder(defaultDriveRef, folderName);
        const folderRef = driveItemRef(defaultDriveRef, folder.id);

        expect(folder.webUrl?.endsWith(`/${folderName}`)).toBeTruthy();

        await deleteDriveItem(folderRef);
    });

    it("can create sub-folder", { timeout: 10000 }, async () => {
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