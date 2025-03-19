import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemPath, driveItemRef } from "../../services/driveItem.js";
import { generateTempFileName } from "../../services/temporaryFiles.js";
import { workbookWorksheetRef } from "../../services/workbookWorksheet.js";
import { deleteDriveItemWithRetry } from "../../tasks/deleteDriveItemWithRetry.js";
import createWorkbook from "../workbook/createWorkbook.js";
import createWorkbookWorksheet from "./createWorkbookWorksheet.js";
import deleteWorkbookWorksheet from "./deleteWorkbookWorksheet.js";
import listWorkbookWorksheets from "./listWorkbookWorksheets.js";

describe("deleteWorkbookWorksheet", () => {
    it("can delete a worksheet from an existing workbook", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await executeSingle(createWorkbook(defaultDriveRef, workbookPath));
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        try {
            const worksheet = await executeSingle(createWorkbookWorksheet(workbookRef));
            const worksheetRef = workbookWorksheetRef(workbookRef, worksheet.id);

            await executeSingle(deleteWorkbookWorksheet(worksheetRef));

            const worksheets = await executeSingle(listWorkbookWorksheets(workbookRef));

            await expect(worksheets.value.some(ws => ws.id === worksheet.id)).toBe(false);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
