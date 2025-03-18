import { describe, it } from "vitest";
import ProtocolError from "../../errors/ProtocolError.js";
import { executeSingle } from "../../graphApi.js";
import type { DriveItemRef } from "../../models/DriveItemRef.js";
import { defaultDriveRef } from "../../services/configuration.js";
import deleteDriveItem from "../driveItem/deleteDriveItem.js";
import createFolder from "./createFolder.js";

describe("createFolder", () => {
    it("can create in root", async () => {
        const topFolderName = crypto.randomUUID();
        console.debug(`Creating top-level folder ${topFolderName}...`);
        const topFolder = await executeSingle(createFolder(defaultDriveRef, topFolderName));

        if (!topFolder.id) {
            throw new ProtocolError("Folder ID is missing");
        }

        const topFolderRef: DriveItemRef = {
            ...defaultDriveRef,
            itemId: topFolder.id
        };

        const bottomFolderName = crypto.randomUUID();
        console.debug(`Creating second-level folder ${bottomFolderName}...`);
        const bottomFolder = await executeSingle(createFolder(topFolderRef, bottomFolderName));

        if (!bottomFolder.id) {
            throw new ProtocolError("Folder ID is missing");
        }

        await executeSingle(deleteDriveItem(topFolderRef));
    });
});