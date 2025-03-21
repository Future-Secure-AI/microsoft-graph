import { describe, expect, it } from "vitest";
import { sequential } from "../../graphApi.ts";
import type { WorkbookWorksheetId } from "../../models/WorkbookWorksheetId.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "./createWorkbookWorksheet.ts";
import listWorkbookWorksheets from "./listWorkbookWorksheets.ts";

describe("listWorkbookWorksheets", () => {
    it("can list worksheets in an existing workbook", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);
        const workbookRef = driveItemRef(getDefaultDriveRef(), workbook.id);

        try {
            const worksheet1 = await createWorkbookWorksheet(workbookRef);
            const worksheet2 = await createWorkbookWorksheet(workbookRef);
            await calculateWorkbook(workbookRef);

            const worksheets = await listWorkbookWorksheets(workbookRef);
            const worksheetIds = worksheets.map(ws => ws.worksheetId) as WorkbookWorksheetId[];

            expect(worksheetIds).toContain(worksheet1.id);
            expect(worksheetIds).toContain(worksheet2.id);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });

    it("can list worksheets in an existing workbook parallel", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);
        const workbookRef = driveItemRef(getDefaultDriveRef(), workbook.id);

        try {
            const [worksheet1, worksheet2, _, worksheets] = await sequential(
                createWorkbookWorksheet(workbookRef),
                createWorkbookWorksheet(workbookRef),
                calculateWorkbook(workbookRef),
                listWorkbookWorksheets(workbookRef)
            );

            const worksheetIds = worksheets.map(ws => ws.worksheetId);

            expect(worksheetIds).toContain(worksheet1.id);
            expect(worksheetIds).toContain(worksheet2.id);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
