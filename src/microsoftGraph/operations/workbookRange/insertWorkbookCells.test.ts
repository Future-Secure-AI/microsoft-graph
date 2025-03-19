import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import type { WorkbookRangeAddress } from "../../models/WorkbookRangeAddress.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemPath, driveItemRef, generateTempFileName } from "../../services/driveItem.js";
import { sleep } from "../../services/sleep.js";
import { workbookWorksheetRangeRef } from "../../services/workbookRange.js";
import { defaultWorksheetId, workbookWorksheetRef } from "../../services/workbookWorksheet.js";
import { deleteDriveItemWithRetry } from "../../tasks/waitAndDeleteDriveItem.js";
import createWorkbook from "../workbook/createWorkbook.js";
import getWorkbookRange from "./getWorkbookRange.js";
import insertWorkbookCells from "./insertWorkbookCells.js";
import updateWorkbookRange from "./updateWorkbookRange.js";

describe("insertWorkbookCells", () => {
    it("can insert cells in an existing workbook", { timeout: 20000 }, async () => {
        const address = "A1:B2" as WorkbookRangeAddress;
        const values = [[1, 2], [3, 4]];

        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await executeSingle(createWorkbook(defaultDriveRef, workbookPath));
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);
        const worksheetRef = workbookWorksheetRef(workbookRef, defaultWorksheetId);
        const rangeRef = workbookWorksheetRangeRef(worksheetRef, address);

        try {
            await executeSingle(updateWorkbookRange(rangeRef, { values: values }));
            /* Initial:
             * 1 2
             * 3 4
             */

            await executeSingle(insertWorkbookCells(worksheetRef, "A1" as WorkbookRangeAddress, "Down"));
            /* Final: 
             * - 2
             * 1 4  
             */

            await sleep(250); // Range isn't updated immediately

            const insertedRange = await executeSingle(getWorkbookRange(rangeRef));

            expect(insertedRange.values).toEqual([["", ""], ["", ""], [1, 2], [3, 4]]);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
