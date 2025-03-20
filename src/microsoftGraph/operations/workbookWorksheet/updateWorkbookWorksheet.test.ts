import { describe, expect, it } from "vitest";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { workbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import { deleteDriveItemWithRetry } from "../../tasks/deleteDriveItemWithRetry.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "./createWorkbookWorksheet.ts";
import updateWorkbookWorksheet from "./updateWorkbookWorksheet.ts";

describe("updateWorkbookWorksheet", () => {
    it("can update the name of an existing worksheet", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        try {
            const worksheet = await createWorkbookWorksheet(workbookRef);
            const worksheetRef = workbookWorksheetRef(workbookRef, worksheet.id);

            const newName = "UpdatedSheet";
            const updatedWorksheet = await updateWorkbookWorksheet(worksheetRef, { name: newName });
            expect(updatedWorksheet.name).toBe(newName);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });

    it("can update the visibility of an existing worksheet", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        try {
            const worksheet = await createWorkbookWorksheet(workbookRef);
            const worksheetRef = workbookWorksheetRef(workbookRef, worksheet.id);

            const updatedWorksheet = await updateWorkbookWorksheet(worksheetRef, { visibility: "Hidden" });
            expect(updatedWorksheet.visibility).toBe("Hidden");
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
