import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import type { WorkbookRangeAddress } from "../../models/WorkbookRangeAddress.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemPath, driveItemRef, generateTempFileName } from "../../services/driveItem.js";
import { sleep } from "../../services/sleep.js";
import { workbookRangeRef } from "../../services/workbookRange.js";
import { workbookWorksheetRef } from "../../services/workbookWorksheet.js";
import deleteDriveItem from "../driveItem/deleteDriveItem.js";
import createWorkbook from "../workbook/createWorkbook.js";
import createWorkbookWorksheet from "../workbookWorksheet/createWorkbookWorksheet.js";
import getWorkbookUsedRange from "./getWorkbookUsedRange.js";
import updateWorkbookRange from "./updateWorkbookRange.js";

describe("getWorkbookUsedRange", () => {
    it("can retrieve the used range from an existing workbook", { timeout: 10000 }, async () => {
        const address = "A1:B2" as WorkbookRangeAddress;
        const values = [[1, 2], [3, 4]];

        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await executeSingle(createWorkbook(defaultDriveRef, workbookPath));
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);
        const worksheet = await executeSingle(createWorkbookWorksheet(workbookRef));
        const worksheetRef = workbookWorksheetRef(workbookRef, worksheet.id);

        try {
            const rangeRef = workbookRangeRef(workbookRef, worksheet.id, address);

            await executeSingle(updateWorkbookRange(rangeRef, {
                values: values
            }));

            const usedRange = await executeSingle(getWorkbookUsedRange(worksheetRef));
            expect(usedRange.values).toEqual(values);
        } finally {
            await sleep(1000);
            await executeSingle(deleteDriveItem(workbookRef));
        }
    });
});
