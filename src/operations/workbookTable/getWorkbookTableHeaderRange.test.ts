import { describe, expect, it } from "vitest";
import { sequential } from "../../graphApi.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { workbookRangeRef } from "../../services/workbookRange.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import updateWorkbookRange from "../workbookRange/updateWorkbookRange.ts";
import createWorkbookWorksheet from "../workbookWorksheet/createWorkbookWorksheet.ts";
import createWorkbookTable from "./createWorkbookTable.ts";
import getWorkbookTableHeaderRange from "./getWorkbookTableHeaderRange.ts";

describe("getWorkbookTableHeaderRange", () => {
    it("can retrieve the header row range of a table", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const driveRef = getDefaultDriveRef();
        const workbook = await createWorkbook(driveRef, workbookPath);

        try {
            const worksheet = await createWorkbookWorksheet(workbook);
            const rangeRef = workbookRangeRef(worksheet, "A1:D4");
            const table = await createWorkbookTable(rangeRef, true);

            await updateWorkbookRange(rangeRef, {
                values: [
                    ["Header1", "Header2", "Header3", "Header4"],
                    ["Value1", "Value2", "Value3", "Value4"],
                    ["Value5", "Value6", "Value7", "Value8"],
                    ["Value9", "Value10", "Value11", "Value12"]
                ]
            });
            await calculateWorkbook(workbook);

            const [_, headerRange] = await sequential(calculateWorkbook(workbook), getWorkbookTableHeaderRange(table));
            expect(headerRange.address).toBeTruthy();
            expect(headerRange.values).toEqual([["Header1", "Header2", "Header3", "Header4"]]);
        } finally {
            await deleteDriveItemWithRetry(workbook);
        }
    });
});

