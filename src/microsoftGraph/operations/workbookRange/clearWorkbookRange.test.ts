import { describe, expect, it } from "vitest";
import { sequential } from "../../graphApi.ts";
import type { WorkbookRangeAddress } from "../../models/WorkbookRangeAddress.ts";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { sleep } from "../../services/sleep.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { defaultWorkbookWorksheetId, workbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import { workbookWorksheetRangeRef } from "../../services/workbookWorksheetRange.ts";
import { deleteDriveItemWithRetry } from "../../tasks/deleteDriveItemWithRetry.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import clearWorkbookRange from "./clearWorkbookRange.ts";
import getWorkbookRange from "./getWorkbookRange.ts";
import updateWorkbookRange from "./updateWorkbookRange.ts";

describe("clearWorkbookRange", () => {
    it("can clear a range in an existing workbook", { timeout: 10000 }, async () => {
        const address = "A1:B2" as WorkbookRangeAddress;
        const values = [[1, 2], [3, 4]];

        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);
        const worksheetRef = workbookWorksheetRef(workbookRef, defaultWorkbookWorksheetId);
        const rangeRef = workbookWorksheetRangeRef(worksheetRef, address);

        try {
            await updateWorkbookRange(rangeRef, {
                values: values
            });

            await clearWorkbookRange(rangeRef);

            const clearedRange = await getWorkbookRange(rangeRef);
            expect(clearedRange.values).toEqual([["", ""], ["", ""]]);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });

    it("can clear a range in an existing workbook sequential", { timeout: 10000 }, async () => {
        const address = "A1:B2" as WorkbookRangeAddress;
        const values = [[1, 2], [3, 4]];

        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);
        const worksheetRef = workbookWorksheetRef(workbookRef, defaultWorkbookWorksheetId);
        const rangeRef = workbookWorksheetRangeRef(worksheetRef, address);

        try {
            await sequential(
                updateWorkbookRange(rangeRef, {
                    values: values
                }),
                clearWorkbookRange(rangeRef)
            );
            
            await sleep(500); // Deletes don't apply immedaitely

            const clearedRange = await getWorkbookRange(rangeRef); // Yeah, this doesn't prove that the above operation occured, room for improvement!
            expect(clearedRange.values).toEqual([["", ""], ["", ""]]);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
