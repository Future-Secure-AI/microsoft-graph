import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemPath, driveItemRef, generateTempFileName } from "../../services/driveItem.js";
import deleteDriveItem from "../driveItem/deleteDriveItem.js";
import createWorkbook from "./createWorkbook.js";

describe("createWorkbook", () => {
    it("can create a new workbook", async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await executeSingle(createWorkbook(defaultDriveRef, workbookPath));
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        expect(workbook.name).toBe(workbookName);

        await executeSingle(deleteDriveItem(workbookRef));
    });
});
