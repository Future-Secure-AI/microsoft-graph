import { describe, expect, it } from "vitest";
import type { WorkbookWorksheetId } from "../../models/WorkbookWorksheetId.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemPath, driveItemRef } from "../../services/driveItem.js";
import { generateTempFileName } from "../../services/temporaryFiles.js";
import { deleteDriveItemWithRetry } from "../../tasks/deleteDriveItemWithRetry.js";
import createWorkbook from "../workbook/createWorkbook.js";
import createWorkbookWorksheet from "./createWorkbookWorksheet.js";
import listWorkbookWorksheets from "./listWorkbookWorksheets.js";

describe("listWorkbookWorksheets", () => {
    it("can list worksheets in an existing workbook", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        try {
            const worksheet1 = await createWorkbookWorksheet(workbookRef);
            const worksheet2 = await createWorkbookWorksheet(workbookRef);

            const worksheets = await listWorkbookWorksheets(workbookRef);
            const worksheetIds = worksheets.value.map(ws => ws.id).filter(id => !!id) as WorkbookWorksheetId[];

            expect(worksheetIds).toContain(worksheet1.id);
            expect(worksheetIds).toContain(worksheet2.id);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
