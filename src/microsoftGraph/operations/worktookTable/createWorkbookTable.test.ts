import { describe, expect, it } from "vitest";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { workbookWorksheetRangeRef } from "../../services/workbookWorksheetRange.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "../workbookWorksheet/createWorkbookWorksheet.ts";
import createWorkbookTable from "./createWorkbookTable.ts";

describe("createWorkbookTable", () => {
    it("can create a new table in an existing worksheet", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        try {
            const worksheet = await createWorkbookWorksheet(workbookRef);
            const rangeRef = workbookWorksheetRangeRef(worksheet, "A1:D4");
            const table = await createWorkbookTable(rangeRef, true);
            expect(table.id).toBeTruthy();
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
