import { describe, expect, it } from "vitest";
import { sequential } from "../../graphApi.ts";
import type { WorkbookWorksheetId } from "../../models/WorkbookWorksheetId.ts";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { sleep } from "../../services/sleep.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { deleteDriveItemWithRetry } from "../../tasks/deleteDriveItemWithRetry.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "./createWorkbookWorksheet.ts";
import listWorkbookWorksheets from "./listWorkbookWorksheets.ts";

describe("listWorkbookWorksheets", () => {
    it("can list worksheets in an existing workbook", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        try {
            const worksheet1 = await createWorkbookWorksheet(workbookRef);
            const worksheet2 = await createWorkbookWorksheet(workbookRef);

            await sleep(500); // Creates don't apply immedaitely

            const worksheets = await listWorkbookWorksheets(workbookRef);
            const worksheetIds = worksheets.value.map(ws => ws.id).filter(id => !!id) as WorkbookWorksheetId[];

            expect(worksheetIds).toContain(worksheet1.id);
            expect(worksheetIds).toContain(worksheet2.id);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });

    it("can list worksheets in an existing workbook sequential", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        try {
            const [worksheet1, worksheet2, worksheets] = await sequential(createWorkbookWorksheet(workbookRef), createWorkbookWorksheet(workbookRef), listWorkbookWorksheets(workbookRef));
            const worksheetIds = worksheets.value.map(ws => ws.id).filter(id => !!id) as WorkbookWorksheetId[];

            expect(worksheetIds).toContain(worksheet1.id);
            expect(worksheetIds).toContain(worksheet2.id);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
