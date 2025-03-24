import { describe, expect, it } from "vitest";
import type { DriveItemId } from "../../models/DriveItemId.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { workbookRangeRef } from "../../services/workbookRange.ts";
import { defaultWorkbookWorksheetId, workbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import updateWorkbookRange from "../workbookRange/updateWorkbookRange.ts";
import getDriveItemContent from "./getDriveItemContent.ts";

describe("getDriveItemContent", () => {
    it("can download the content of an existing workbook", { timeout: 20000 }, async () => {
        const workbookPath = driveItemPath(generateTempFileName("xlsx"));
        const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);

        try {
            const worksheetRef = workbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
            const rangeRef = workbookRangeRef(worksheetRef, "A1:B1");

            await updateWorkbookRange(rangeRef, {
                values: [
                    ["Hello", "World"]
                ]
            });

            await calculateWorkbook(workbook);

            const content = await getDriveItemContent(workbook);
            expect(content).toBeInstanceOf(ArrayBuffer);
            expect(content.byteLength).toBeGreaterThan(0);
        } finally {
            await deleteDriveItemWithRetry(workbook);
        }
    });

    it("throws an error when trying to download a non-existent item", async () => {
        const nonExistentItemRef = driveItemRef(getDefaultDriveRef(), "non-existent-item-id" as DriveItemId);

        await expect(getDriveItemContent(nonExistentItemRef)).rejects.toThrow();
    });
});
