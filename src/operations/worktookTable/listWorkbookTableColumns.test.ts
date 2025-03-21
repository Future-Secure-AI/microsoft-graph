import { describe, expect, it } from "vitest";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemPath, } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { workbookWorksheetRangeRef } from "../../services/workbookWorksheetRange.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "../workbookWorksheet/createWorkbookWorksheet.ts";
import createWorkbookTable from "./createWorkbookTable.ts";
import listWorkbookTableColumns from "./listWorkbookTableColumns.ts";

describe("listWorkbookTableColumns", () => {
    it("can list columns in an existing table", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);

        try {
            const worksheet = await createWorkbookWorksheet(workbook);

            const rangeRef = workbookWorksheetRangeRef(worksheet, "A1:D4");
            const table = await createWorkbookTable(rangeRef, true);

            await calculateWorkbook(workbook);

            const columns = await listWorkbookTableColumns(table);
            expect(columns.length).toBeGreaterThan(0);
        } finally {
            await deleteDriveItemWithRetry(workbook);
        }
    });
});
