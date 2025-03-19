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
import updateWorkbookRange from "./updateWorkbookRange.js";

describe("getWorkbookUsedRange", () => {
    it("can retrieve the used range from an existing workbook", async () => {
        const address = "A1:B2" as WorkbookRangeAddress;
        const values = [[1, 2], [3, 4]];

        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await executeSingle(createWorkbook(defaultDriveRef, workbookPath));
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);
        const worksheetRef = workbookWorksheetRef(workbookRef, defaultWorksheetId);
        const rangeRef = workbookWorksheetRangeRef(worksheetRef, address);

        try {
            await executeSingle(updateWorkbookRange(rangeRef, {
                values: values
            }));

            await sleep(500); // Used range isn't immediately updated?
            const usedRange = await executeSingle(getWorkbookUsedRange(worksheetRef));
            expect(usedRange.values).toEqual(values);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
