import { describe, expect, it } from "vitest";
import { sequential } from "../../graphApi.ts";
import type { WorkbookRangeAddress } from "../../models/WorkbookRangeAddress.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { defaultWorkbookWorksheetId, workbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import { workbookWorksheetRangeRef } from "../../services/workbookWorksheetRange.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import getWorkbookVisibleRange from "./getWorkbookVisibleRange.ts";
import updateWorkbookRange from "./updateWorkbookRange.ts";

describe("getWorkbookRangeVisible", () => {
    it("can retrieve the visible view of a range in an existing workbook", { timeout: 10000 }, async () => {
        const address = "A1:B2" as WorkbookRangeAddress;
        const values = [[1, 2], [3, 4]];

        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const driveRef = getDefaultDriveRef();
        const workbook = await createWorkbook(driveRef, workbookPath);
        const workbookRef = driveItemRef(driveRef, workbook.id);
        const worksheetRef = workbookWorksheetRef(workbookRef, defaultWorkbookWorksheetId);
        const rangeRef = workbookWorksheetRangeRef(worksheetRef, address);

        try {
            await updateWorkbookRange(rangeRef, { values: values });
            await calculateWorkbook(workbookRef);

            const visibleView = await getWorkbookVisibleRange(rangeRef);
            expect(visibleView).toBeDefined();
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });

    it("can retrieve the visible view of a range in an existing workbook sequential", { timeout: 10000 }, async () => {
        const address = "A1:B2" as WorkbookRangeAddress;
        const values = [[1, 2], [3, 4]];

        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const driveRef = getDefaultDriveRef();
        const workbook = await createWorkbook(driveRef, workbookPath);
        const workbookRef = driveItemRef(driveRef, workbook.id);
        const worksheetRef = workbookWorksheetRef(workbookRef, defaultWorkbookWorksheetId);
        const rangeRef = workbookWorksheetRangeRef(worksheetRef, address);

        try {
            const [_, __, visibleView] = await sequential(
                updateWorkbookRange(rangeRef, { values: values }),
                calculateWorkbook(workbookRef),
                getWorkbookVisibleRange(rangeRef)
            );
            expect(visibleView).toBeDefined();
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });

    it("omits hidden row from the visible view of a range", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const driveRef = getDefaultDriveRef();
        const workbook = await createWorkbook(driveRef, workbookPath);
        const worksheetRef = workbookWorksheetRef(workbook, defaultWorkbookWorksheetId);

        try {
            const rangeRef = workbookWorksheetRangeRef(worksheetRef, "A1:C3");
            await updateWorkbookRange(rangeRef, {
                values: [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]
            });

            const hiddenRange = workbookWorksheetRangeRef(worksheetRef, "B:B");

            const [_, __, visibleView] = await sequential(
                updateWorkbookRange(hiddenRange, {
                    columnHidden: true
                }),
                calculateWorkbook(workbook),
                getWorkbookVisibleRange(rangeRef)
            );
            expect(visibleView.values).toEqual([
                [1, 3],
                [4, 6],
                [7, 9]
            ]);
        } finally {
            await deleteDriveItemWithRetry(workbook);
        }
    });


    it("omits hidden column from the visible view of a range", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const driveRef = getDefaultDriveRef();
        const workbook = await createWorkbook(driveRef, workbookPath);
        const worksheetRef = workbookWorksheetRef(workbook, defaultWorkbookWorksheetId);

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

            const [_, __, visibleView] = await sequential(
                updateWorkbookRange(hiddenRange, {
                    rowHidden: true
                }),
                calculateWorkbook(workbook),
                getWorkbookVisibleRange(rangeRef)
            );
            expect(visibleView.values).toEqual([
                [1, 2, 3],
                [7, 8, 9]
            ]);
        } finally {
            await deleteDriveItemWithRetry(workbook);
        }
    });
});
