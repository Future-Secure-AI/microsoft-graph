import { describe, expect, it } from "vitest";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { sleep } from "../../services/sleep.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { workbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import { workbookWorksheetRangeRef } from "../../services/workbookWorksheetRange.ts";
import { deleteDriveItemWithRetry } from "../../tasks/deleteDriveItemWithRetry.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "../workbookWorksheet/createWorkbookWorksheet.ts";
import createTable from "./createTable.ts";
import listTables from "./listTables.ts";

describe("listTables", () => {
    it("can list tables in an existing worksheet", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        try {
            const worksheet = await createWorkbookWorksheet(workbookRef);
            const worksheetRef = workbookWorksheetRef(workbookRef, worksheet.id);

            const rangeRef = workbookWorksheetRangeRef(worksheetRef, "A1:D4");
            await createTable(rangeRef, true);
            await sleep(500); // Tables don't apply immediately

            const tables = await listTables(worksheetRef);
            expect(tables.value.length).toBeGreaterThan(0);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
