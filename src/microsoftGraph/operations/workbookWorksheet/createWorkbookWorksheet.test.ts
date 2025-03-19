import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import type { WorkbookWorksheetName } from "../../models/WorkbookWorksheetName.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemPath, driveItemRef } from "../../services/driveItem.js";
import { generateTempFileName } from "../../services/temporaryFiles.js";
import { deleteDriveItemWithRetry } from "../../tasks/waitAndDeleteDriveItem.js";
import createWorkbook from "../workbook/createWorkbook.js";
import createWorkbookWorksheet from "./createWorkbookWorksheet.js";

describe("createWorkbookWorksheet", () => {
    it("can create a new worksheet in an existing workbook", async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await executeSingle(createWorkbook(defaultDriveRef, workbookPath));
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);
        const worksheetName = "Sheet2" as WorkbookWorksheetName;

        try {
            const worksheet = await executeSingle(createWorkbookWorksheet(workbookRef, worksheetName));
            expect(worksheet.name).toBe(worksheetName);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });

    it("can create a new worksheet without a name", async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await executeSingle(createWorkbook(defaultDriveRef, workbookPath));
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        try {
            const worksheet = await executeSingle(createWorkbookWorksheet(workbookRef));
            expect(worksheet.name).toBeDefined();
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
