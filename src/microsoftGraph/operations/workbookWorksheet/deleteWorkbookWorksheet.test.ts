import { describe, expect, it } from "vitest";
import { sequential } from "../../graphApi.ts";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { workbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "./createWorkbookWorksheet.ts";
import deleteWorkbookWorksheet from "./deleteWorkbookWorksheet.ts";
import listWorkbookWorksheets from "./listWorkbookWorksheets.ts";

describe("deleteWorkbookWorksheet", () => {
    it("can delete a worksheet from an existing workbook", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        try {
            const worksheet = await createWorkbookWorksheet(workbookRef);
            const worksheetRef = workbookWorksheetRef(workbookRef, worksheet.id);

            await deleteWorkbookWorksheet(worksheetRef);
            await calculateWorkbook(workbookRef);

            const worksheets = await listWorkbookWorksheets(workbookRef);

            expect(worksheets.some(ws => ws.id === worksheet.id)).toBe(false);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });

    it("can delete a worksheet from an existing workbook sequential", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        try {
            const worksheet = await createWorkbookWorksheet(workbookRef);
            const worksheetRef = workbookWorksheetRef(workbookRef, worksheet.id);

            const [_, __, worksheets] = await sequential(
                deleteWorkbookWorksheet(worksheetRef),
                calculateWorkbook(workbookRef),
                listWorkbookWorksheets(workbookRef)
            );

            expect(worksheets.some(ws => ws.id === worksheet.worksheetId)).toBe(false);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
