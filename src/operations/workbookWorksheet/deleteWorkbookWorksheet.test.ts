import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "./createWorkbookWorksheet.ts";
import deleteWorkbookWorksheet from "./deleteWorkbookWorksheet.ts";
import listWorkbookWorksheets from "./listWorkbookWorksheets.ts";

describe("deleteWorkbookWorksheet", () => {
    it("can delete a worksheet from an existing workbook", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);
        const workbookRef = driveItemRef(getDefaultDriveRef(), workbook.id);

        try {
            const worksheet = await createWorkbookWorksheet(workbookRef);

            await deleteWorkbookWorksheet(worksheet);
            await calculateWorkbook(workbookRef);

            const worksheets = await listWorkbookWorksheets(workbookRef);

            expect(worksheets.some(ws => ws.id === worksheet.id)).toBe(false);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
