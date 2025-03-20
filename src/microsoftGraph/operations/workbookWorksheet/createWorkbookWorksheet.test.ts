import { describe, expect, it } from "vitest";
import type { WorkbookWorksheetName } from "../../models/WorkbookWorksheetName.ts";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "./createWorkbookWorksheet.ts";

describe("createWorkbookWorksheet", () => {
    it("can create a new worksheet in an existing workbook", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);
        const worksheetName = "Sheet2" as WorkbookWorksheetName;

        try {
            const worksheet = await createWorkbookWorksheet(workbookRef, worksheetName);
            expect(worksheet.name).toBe(worksheetName);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });

    it("can create a new worksheet without a name", async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        try {
            const worksheet = await createWorkbookWorksheet(workbookRef);
            expect(worksheet.name).toBeDefined();
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
