import { describe, expect, it } from "vitest";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { sleep } from "../../services/sleep.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { workbookTableRef } from "../../services/workbookTable.ts";
import { workbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import { workbookWorksheetRangeRef } from "../../services/workbookWorksheetRange.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "../workbookWorksheet/createWorkbookWorksheet.ts";
import createWorkbookTable from "./createWorkbookTable.ts";
import getWorkbookTable from "./getWorkbookTable.ts";

describe("getWorkbookTable", () => {
    it("can retrieve a table by its ID", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        try {
            const worksheet = await createWorkbookWorksheet(workbookRef);
            const worksheetRef = workbookWorksheetRef(workbookRef, worksheet.id);

            const rangeRef = workbookWorksheetRangeRef(worksheetRef, "A1:D4");
            const table = await createWorkbookTable(rangeRef, true);
            await sleep(500); // Tables don't apply immediately

            const tableRef = workbookTableRef(worksheetRef, table.id);
            const retrievedTable = await getWorkbookTable(tableRef);
            expect(retrievedTable.id).toBe(table.id);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
