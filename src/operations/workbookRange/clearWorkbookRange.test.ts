import { describe, expect, it } from "vitest";
import { sequential } from "../../graphApi.ts";
import type { WorkbookRangeAddress } from "../../models/WorkbookRangeAddress.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath, } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { workbookRangeRef } from "../../services/workbookRange.ts";
import { defaultWorkbookWorksheetId, workbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import getWorkbookWorksheetRange from "../workbookWorksheet/getWorkbookWorksheetRange.ts";
import clearWorkbookRange from "./clearWorkbookRange.ts";
import updateWorkbookRange from "./updateWorkbookRange.ts";

describe("clearWorkbookRange", () => {
    it("can clear a range in an existing workbook", { timeout: 10000 }, async () => {
        const address = "A1:B2" as WorkbookRangeAddress;
        const values = [[1, 2], [3, 4]];

        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const driveRef = getDefaultDriveRef();
        const workbook = await createWorkbook(driveRef, workbookPath);
        const worksheetRef = workbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
        const rangeRef = workbookRangeRef(worksheetRef, address);

        try {
            await updateWorkbookRange(rangeRef, {
                values: values
            });

            await clearWorkbookRange(rangeRef);
            await calculateWorkbook(workbook);

            const clearedRange = await getWorkbookWorksheetRange(rangeRef);
            expect(clearedRange.values).toEqual([["", ""], ["", ""]]);
        } finally {
            await deleteDriveItemWithRetry(workbook);
        }
    });

    it("can clear a range in an existing workbook sequential", { timeout: 10000 }, async () => {
        const address = "A1:B2" as WorkbookRangeAddress;
        const values = [[1, 2], [3, 4]];

        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const driveRef = getDefaultDriveRef();
        const workbook = await createWorkbook(driveRef, workbookPath);
        const worksheetRef = workbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
        const rangeRef = workbookRangeRef(worksheetRef, address);

        try {
            const [_, __, ___, clearedRange] = await sequential(
                updateWorkbookRange(rangeRef, {
                    values: values
                }),
                clearWorkbookRange(rangeRef),
                calculateWorkbook(workbook),
                getWorkbookWorksheetRange(rangeRef)
            );

            expect(clearedRange.values).toEqual([["", ""], ["", ""]]);
        } finally {
            await deleteDriveItemWithRetry(workbook);
        }
    });
});
