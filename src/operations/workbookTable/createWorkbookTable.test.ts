import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath, } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "../workbookWorksheet/createWorkbookWorksheet.ts";
import createWorkbookTable from "./createWorkbookTable.ts";

describe("createWorkbookTable", () => {
    it("can create a new table in an existing worksheet", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);

        try {
            const worksheet = await createWorkbookWorksheet(workbook);
            const rangeRef = createWorkbookRangeRef(worksheet, "A1:D4");
            const table = await createWorkbookTable(rangeRef, true);
            expect(table.id).toBeTruthy();
        } finally {
            await deleteDriveItemWithRetry(workbook);
        }
    });
});
