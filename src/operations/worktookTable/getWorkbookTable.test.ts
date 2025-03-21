import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath, } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { workbookWorksheetRangeRef } from "../../services/workbookWorksheetRange.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "../workbookWorksheet/createWorkbookWorksheet.ts";
import createWorkbookTable from "./createWorkbookTable.ts";
import getWorkbookTable from "./getWorkbookTable.ts";

describe("getWorkbookTable", () => {
    it("can retrieve a table by its ID", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);

        try {
            const worksheet = await createWorkbookWorksheet(workbook);

            const rangeRef = workbookWorksheetRangeRef(worksheet, "A1:D4");
            const table = await createWorkbookTable(rangeRef, true);
            await calculateWorkbook(workbook);

            const retrievedTable = await getWorkbookTable(table);
            expect(retrievedTable.tableId).toBe(table.tableId);
        } finally {
            await deleteDriveItemWithRetry(workbook);
        }
    });
});
