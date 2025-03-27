import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath, } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "../workbookWorksheet/createWorkbookWorksheet.ts";
import createWorkbookTable from "./createWorkbookTable.ts";
import listTables from "./listWorkbookTables.ts";

describe("listWorkbookTables", () => {
    it("can list tables in an existing worksheet", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const driveRef = getDefaultDriveRef();
        const workbook = await createWorkbook(driveRef, workbookPath);

        try {
            const worksheet = await createWorkbookWorksheet(workbook);

            const rangeRef = createWorkbookRangeRef(worksheet, "A1:D4");
            await createWorkbookTable(rangeRef, true);
            await calculateWorkbook(workbook);

            const tables = await listTables(worksheet);
            expect(tables.length).toBeGreaterThan(0);
        } finally {
            await deleteDriveItemWithRetry(workbook);
        }
    });
});
