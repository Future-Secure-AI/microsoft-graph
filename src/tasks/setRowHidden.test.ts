import { describe, expect, it } from "vitest";
import calculateWorkbook from "../operations/workbook/calculateWorkbook.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import getWorkbookVisibleRange from "../operations/workbookRange/getWorkbookVisibleRange.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath, driveItemRef } from "../services/driveItem.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import { defaultWorkbookWorksheetId, workbookWorksheetRef } from "../services/workbookWorksheet.ts";
import { workbookWorksheetRangeRef } from "../services/workbookWorksheetRange.ts";
import deleteDriveItemWithRetry from "./deleteDriveItemWithRetry.ts";
import setRowHidden from "./setRowHidden.ts";

describe("setRowHidden", () => {
    it("hides a row in an existing workbook", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const driveRef = getDefaultDriveRef();
        const workbook = await createWorkbook(driveRef, workbookPath);
        const workbookRef = driveItemRef(driveRef, workbook.id);
        const worksheetRef = workbookWorksheetRef(workbookRef, defaultWorkbookWorksheetId);

        try {
            const rangeRef = workbookWorksheetRangeRef(worksheetRef, "A1:C3");
            await updateWorkbookRange(rangeRef, {
                values: [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]
            });

            const hiddenRange = workbookWorksheetRangeRef(worksheetRef, "2:2");
            await setRowHidden(hiddenRange, true);
            await calculateWorkbook(workbookRef);

            const visibleView = await getWorkbookVisibleRange(rangeRef);
            expect(visibleView.values).toEqual([
                [1, 2, 3],
                [7, 8, 9]
            ]);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
