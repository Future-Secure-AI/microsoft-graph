import { describe, expect, it } from "vitest";
import { defaultDriveRef } from "../../services/configuration.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { sleep } from "../../services/sleep.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { workbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import { deleteDriveItemWithRetry } from "../../tasks/deleteDriveItemWithRetry.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "./createWorkbookWorksheet.ts";
import deleteWorkbookWorksheet from "./deleteWorkbookWorksheet.ts";
import listWorkbookWorksheets from "./listWorkbookWorksheets.ts";

describe("deleteWorkbookWorksheet", () => {
    it("can delete a worksheet from an existing workbook", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(defaultDriveRef, workbookPath);
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        try {
            const worksheet = await createWorkbookWorksheet(workbookRef);
            const worksheetRef = workbookWorksheetRef(workbookRef, worksheet.id);

            await deleteWorkbookWorksheet(worksheetRef);
            await sleep(500); // Deletes don't apply immedaitely

            const worksheets = await listWorkbookWorksheets(workbookRef);

            await expect(worksheets.value.some(ws => ws.id === worksheet.id)).toBe(false);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
