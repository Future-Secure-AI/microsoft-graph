import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import type { WorkbookRangeAddress } from "../../models/WorkbookRangeAddress.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemPath, driveItemRef, generateTempFileName } from "../../services/driveItem.js";
import { workbookWorksheetRangeRef } from "../../services/workbookRange.js";
import { defaultWorksheetId, workbookWorksheetRef } from "../../services/workbookWorksheet.js";
import { deleteDriveItemWithRetry } from "../../tasks/waitAndDeleteDriveItem.js";
import createWorkbook from "../workbook/createWorkbook.js";
import updateWorkbookRange from "./updateWorkbookRange.js";

describe("getWorkbookRange", () => {
    it("can retrieve a range from an existing workbook", { timeout: 10000 }, async () => {
        const address = "A1:B2" as WorkbookRangeAddress;
        const values = [[1, 2], [3, 4]];

        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await executeSingle(createWorkbook(defaultDriveRef, workbookPath));
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);
        const worksheetRef = workbookWorksheetRef(workbookRef, defaultWorksheetId);
        const rangeRef = workbookWorksheetRangeRef(worksheetRef, address);

        try {
            const range = await executeSingle(updateWorkbookRange(rangeRef, {
                values: values
            }));

            expect(range.values).toEqual(values);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
