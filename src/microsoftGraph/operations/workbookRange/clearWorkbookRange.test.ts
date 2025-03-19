import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import type { WorkbookRangeAddress } from "../../models/WorkbookRangeAddress.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemPath, driveItemRef } from "../../services/driveItem.js";
import { sleep } from "../../services/sleep.js";
import { generateTempFileName } from "../../services/temporaryFiles.js";
import { defaultWorkbookWorksheetId, workbookWorksheetRef } from "../../services/workbookWorksheet.js";
import { workbookWorksheetRangeRef } from "../../services/workbookWorksheetRange.js";
import { deleteDriveItemWithRetry } from "../../tasks/deleteDriveItemWithRetry.js";
import createWorkbook from "../workbook/createWorkbook.js";
import clearWorkbookRange from "./clearWorkbookRange.js";
import getWorkbookRange from "./getWorkbookRange.js";
import updateWorkbookRange from "./updateWorkbookRange.js";

describe("clearWorkbookRange", () => {
    it("can clear a range in an existing workbook", { timeout: 10000 }, async () => {
        const address = "A1:B2" as WorkbookRangeAddress;
        const values = [[1, 2], [3, 4]];

        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await executeSingle(createWorkbook(defaultDriveRef, workbookPath));
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);
        const worksheetRef = workbookWorksheetRef(workbookRef, defaultWorkbookWorksheetId);
        const rangeRef = workbookWorksheetRangeRef(worksheetRef, address);

        try {
            await executeSingle(updateWorkbookRange(rangeRef, {
                values: values
            }));

            await executeSingle(clearWorkbookRange(rangeRef));

            await sleep(500); // Range isn't updated immediately

            const clearedRange = await executeSingle(getWorkbookRange(rangeRef));
            expect(clearedRange.values).toEqual([["", ""], ["", ""]]);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
