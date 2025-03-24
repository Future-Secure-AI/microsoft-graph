import { describe, expect, it } from "vitest";
import type { WorkbookRangeAddress } from "../../models/WorkbookRangeAddress.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { workbookRangeRef } from "../../services/workbookRange.ts";
import { defaultWorkbookWorksheetId, workbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import getWorkbookUsedRange from "./getWorkbookUsedRange.ts";
import insertWorkbookCells from "./insertWorkbookCells.ts";
import updateWorkbookRange from "./updateWorkbookRange.ts";

describe("insertWorkbookCells", () => {
    it("can insert cells in an existing workbook using sequential", { timeout: 20000 }, async () => {
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
        const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);
        const workbookRef = driveItemRef(getDefaultDriveRef(), workbook.id);
        const worksheetRef = workbookWorksheetRef(workbookRef, defaultWorkbookWorksheetId);
        const rangeRef = workbookRangeRef(worksheetRef, address);

        try {
            await updateWorkbookRange(rangeRef, { values: initialValues });
            await insertWorkbookCells(worksheetRef, "A1" as WorkbookRangeAddress, "Down");
            await calculateWorkbook(workbookRef);
            const insertedRange = await getWorkbookUsedRange(rangeRef);

            expect(insertedRange.values).toEqual(finalValues);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
