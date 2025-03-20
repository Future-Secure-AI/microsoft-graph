import { describe, expect, it } from "vitest";
import type { WorkbookRangeAddress } from "../../models/WorkbookRangeAddress.ts";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { sleep } from "../../services/sleep.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { defaultWorkbookWorksheetId, workbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import { workbookWorksheetRangeRef } from "../../services/workbookWorksheetRange.ts";
import { deleteDriveItemWithRetry } from "../../tasks/deleteDriveItemWithRetry.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import getWorkbookUsedRange from "./getWorkbookUsedRange.ts";
import insertWorkbookCells from "./insertWorkbookCells.ts";
import updateWorkbookRange from "./updateWorkbookRange.ts";

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
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);
        const worksheetRef = workbookWorksheetRef(workbookRef, defaultWorkbookWorksheetId);
        const rangeRef = workbookWorksheetRangeRef(worksheetRef, address);

        try {
            await updateWorkbookRange(rangeRef, { values: initialValues });
            await insertWorkbookCells(worksheetRef, "A1" as WorkbookRangeAddress, "Down");

            await sleep(1000); // Range isn't updated immediately

            const insertedRange = await getWorkbookUsedRange(rangeRef);

            expect(insertedRange.values).toEqual(finalValues);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
