import { describe, expect, it } from "vitest";
import ProtocolError from "../../errors/ProtocolError.js";
import { executeSingle } from "../../graphApi.js";
import type { DriveItemRef } from "../../models/DriveItemRef.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { generateTempFileName } from "../../services/drivePath.js";
import deleteDriveItem from "../driveItem/deleteDriveItem.js";
import createFolder from "./createFolder.js";

describe("createFolder", () => {
    it("can create root folder", async () => {
        const folderName = generateTempFileName();
        const folder = await executeSingle(createFolder(defaultDriveRef, folderName));

        if (!folder.id) {
            throw new ProtocolError("Folder ID is missing");
        }

        const folderRef: DriveItemRef = {
            ...defaultDriveRef,
            itemId: folder.id
        };

        expect(folder.webUrl?.endsWith(`/${folderName}`)).toBeTruthy();

        await executeSingle(deleteDriveItem(folderRef));
    });

    it("can create sub-folder", async () => {
        const topFolderName = generateTempFileName();
        console.debug(`Creating top-level folder ${topFolderName}...`);
        const topFolder = await executeSingle(createFolder(defaultDriveRef, topFolderName));

        if (!topFolder.id) {
            throw new ProtocolError("Folder ID is missing");
        }

        const topFolderRef: DriveItemRef = {
            ...defaultDriveRef,
            itemId: topFolder.id
        };

        try {
            const bottomFolderName = generateTempFileName();
            console.debug(`Creating second-level folder ${bottomFolderName}...`);
            const bottomFolder = await executeSingle(createFolder(topFolderRef, bottomFolderName));

            if (!bottomFolder.id) {
                throw new ProtocolError("Folder ID is missing");
            }

            expect(bottomFolder.webUrl?.endsWith(`/${topFolderName}/${bottomFolderName}`)).toBeTruthy();
        } finally {
            await executeSingle(deleteDriveItem(topFolderRef));
        }
    });
});