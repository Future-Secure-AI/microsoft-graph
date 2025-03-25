import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath, } from "../../services/driveItem.ts";
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

        try {
            const worksheet = await createWorkbookWorksheet(workbook);
            const newName = "UpdatedSheet";
            const updatedWorksheet = await updateWorkbookWorksheet(worksheet, { name: newName });
            expect(updatedWorksheet.name).toBe(newName);
        } finally {
            await deleteDriveItemWithRetry(workbook);
        }
    });

    it("can update the visibility of an existing worksheet", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);

        try {
            const worksheet = await createWorkbookWorksheet(workbook);
            const updatedWorksheet = await updateWorkbookWorksheet(worksheet, { visibility: "Hidden" });
            expect(updatedWorksheet.visibility).toBe("Hidden");
        } finally {
            await deleteDriveItemWithRetry(workbook);
        }
    });
});
