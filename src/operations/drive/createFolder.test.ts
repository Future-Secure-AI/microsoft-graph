import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import deleteDriveItem from "../driveItem/deleteDriveItem.ts";
import createFolder from "./createFolder.ts";

describe("createFolder", () => {
    it("can create root folder", { timeout: 10000 }, async () => {
        const driveRef = getDefaultDriveRef();
        const folderName = generateTempFileName();
        const folder = await createFolder(driveRef, folderName);

        expect(folder.webUrl?.endsWith(`/${folderName}`)).toBeTruthy();

        await deleteDriveItem(folder);
    });

    it("can create sub-folder", { timeout: 10000 }, async () => {
        const driveRef = getDefaultDriveRef();
        const topFolderName = generateTempFileName();
        console.debug(`Creating top-level folder ${topFolderName}...`);
        const topFolder = await createFolder(driveRef, topFolderName);

        try {
            const bottomFolderName = generateTempFileName();
            console.debug(`Creating second-level folder ${bottomFolderName}...`);
            const bottomFolder = await createFolder(topFolder, bottomFolderName);

            expect(bottomFolder.webUrl?.endsWith(`/${topFolderName}/${bottomFolderName}`)).toBeTruthy();
        } finally {
            await deleteDriveItem(topFolder);
        }
    });

});