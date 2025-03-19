import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import type { WorkbookRangeAddress } from "../../models/WorkbookRangeAddress.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemPath, driveItemRef } from "../../services/driveItem.js";
import { sleep } from "../../services/sleep.js";
import { generateTempFileName } from "../../services/temporaryFiles.js";
import { defaultWorksheetId, workbookWorksheetRef } from "../../services/workbookWorksheet.js";
import { workbookWorksheetRangeRef } from "../../services/workbookWorksheetRange.js";
import { deleteDriveItemWithRetry } from "../../tasks/waitAndDeleteDriveItem.js";
import createWorkbook from "../workbook/createWorkbook.js";
import getWorkbookUsedRange from "./getWorkbookUsedRange.js";
import insertWorkbookCells from "./insertWorkbookCells.js";
import updateWorkbookRange from "./updateWorkbookRange.js";

describe("insertWorkbookCells", () => {
    it("can insert cells in an existing workbook", { timeout: 20000 }, async () => {
        const address = "A1:B2" as WorkbookRangeAddress;
        const initialValues = [
            [1, 2],
            [3, 4]
        ];
        const finalValues = [
            ["", 2],
            [1, 4],
            [3, ""]
        ];

        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await executeSingle(createWorkbook(defaultDriveRef, workbookPath));
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);
        const worksheetRef = workbookWorksheetRef(workbookRef, defaultWorksheetId);
        const rangeRef = workbookWorksheetRangeRef(worksheetRef, address);

        try {
            await executeSingle(updateWorkbookRange(rangeRef, { values: initialValues }));
            await executeSingle(insertWorkbookCells(worksheetRef, "A1" as WorkbookRangeAddress, "Down"));

            await sleep(500); // Range isn't updated immediately

            const insertedRange = await executeSingle(getWorkbookUsedRange(rangeRef));

            expect(insertedRange.values).toEqual(finalValues);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
