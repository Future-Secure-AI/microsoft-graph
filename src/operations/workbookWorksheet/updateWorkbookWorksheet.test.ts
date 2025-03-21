import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "./createWorkbookWorksheet.ts";
import updateWorkbookWorksheet from "./updateWorkbookWorksheet.ts";

describe("updateWorkbookWorksheet", () => {
    it("can update the name of an existing worksheet", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);
        const workbookRef = driveItemRef(getDefaultDriveRef(), workbook.id);

        try {
            const worksheet = await createWorkbookWorksheet(workbookRef);
            const newName = "UpdatedSheet";
            const updatedWorksheet = await updateWorkbookWorksheet(worksheet, { name: newName });
            expect(updatedWorksheet.name).toBe(newName);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });

    it("can update the visibility of an existing worksheet", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);
        const workbookRef = driveItemRef(getDefaultDriveRef(), workbook.id);

        try {
            const worksheet = await createWorkbookWorksheet(workbookRef);
            const updatedWorksheet = await updateWorkbookWorksheet(worksheet, { visibility: "Hidden" });
            expect(updatedWorksheet.visibility).toBe("Hidden");
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
