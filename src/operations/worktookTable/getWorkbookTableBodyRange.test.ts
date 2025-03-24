import { describe, expect, it } from "vitest";
import { sequential } from "../../graphApi.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { workbookWorksheetRangeRef } from "../../services/workbookWorksheetRange.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "../workbookWorksheet/createWorkbookWorksheet.ts";
import createWorkbookTable from "./createWorkbookTable.ts";
import getWorkbookTableBodyRange from "./getWorkbookTableBodyRange.ts";

describe("getWorkbookTableBodyRange", () => {
    it("can retrieve the data body range of a table", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const driveRef = getDefaultDriveRef();
        const workbook = await createWorkbook(driveRef, workbookPath);

        try {
            const worksheet = await createWorkbookWorksheet(workbook);
            const rangeRef = workbookWorksheetRangeRef(worksheet, "A1:D4");
            const table = await createWorkbookTable(rangeRef, true);

            const [_, dataBodyRange] = await sequential(calculateWorkbook(workbook), getWorkbookTableBodyRange(table));
            expect(dataBodyRange.address).toBeTruthy();
        } finally {
            await deleteDriveItemWithRetry(workbook);
        }
    });
});
