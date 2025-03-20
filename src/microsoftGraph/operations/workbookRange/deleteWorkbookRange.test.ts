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
import deleteWorkbookRange from "./deleteWorkbookRange.ts";
import getWorkbookRange from "./getWorkbookRange.ts";
import updateWorkbookRange from "./updateWorkbookRange.ts";

describe("deleteWorkbookRange", () => {
    it("can delete a range in an existing workbook", { timeout: 10000 }, async () => {
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

            await deleteWorkbookRange(rangeRef, "Up");

            await sleep(500); // Deletes don't apply immedaitely

            const deletedRange = await getWorkbookRange(rangeRef);
            expect(deletedRange.values).toEqual([["", ""], ["", ""]]);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });

    it("can delete a range in an existing workbook sequential", { timeout: 10000 }, async () => {
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
                deleteWorkbookRange(rangeRef, "Up")
            );

            await sleep(500); // Updates don't always apply immediately

            const deletedRange = await getWorkbookRange(rangeRef);
            expect(deletedRange.values).toEqual([["", ""], ["", ""]]);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
