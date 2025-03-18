import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemRef, generateTempFileName } from "../../services/drivePath.js";
import deleteDriveItem from "../driveItem/deleteDriveItem.js";
import createFolder from "./createFolder.js";

describe("createFolder", () => {
    it("can create root folder", async () => {
        const folderName = generateTempFileName();
        const folder = await executeSingle(createFolder(defaultDriveRef, folderName));
        const folderRef = driveItemRef(defaultDriveRef, folder.id);

        expect(folder.webUrl?.endsWith(`/${folderName}`)).toBeTruthy();

        await executeSingle(deleteDriveItem(folderRef));
    });

    it("can create sub-folder", async () => {
        const topFolderName = generateTempFileName();
        console.debug(`Creating top-level folder ${topFolderName}...`);
        const topFolder = await executeSingle(createFolder(defaultDriveRef, topFolderName));
        const topFolderRef = driveItemRef(defaultDriveRef, topFolder.id);

        try {
            const bottomFolderName = generateTempFileName();
            console.debug(`Creating second-level folder ${bottomFolderName}...`);
            const bottomFolder = await executeSingle(createFolder(topFolderRef, bottomFolderName));

            expect(bottomFolder.webUrl?.endsWith(`/${topFolderName}/${bottomFolderName}`)).toBeTruthy();
        } finally {
            await executeSingle(deleteDriveItem(topFolderRef));
        }
    });
});