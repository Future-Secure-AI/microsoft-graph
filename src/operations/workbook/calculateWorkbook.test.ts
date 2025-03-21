import { describe, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath, driveItemRef } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import calculateWorkbook from "./calculateWorkbook.ts";
import createWorkbook from "./createWorkbook.ts";

describe("calculateWorkbook", () => {
    // All we're really doing is check that there's no errors

    it(`can calculate workbook with calculation type: 'Recalculate'`, { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);
        const workbookRef = driveItemRef(getDefaultDriveRef(), workbook.id);

        try {
            await calculateWorkbook(workbookRef, "Recalculate");
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });

    it(`can calculate workbook with calculation type: 'Full'`, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);
        const workbookRef = driveItemRef(getDefaultDriveRef(), workbook.id);
        try {
            await calculateWorkbook(workbookRef, "Full");
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });

    it(`can calculate workbook with calculation type: 'FullRebuild'`, { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await createWorkbook(getDefaultDriveRef(), workbookPath);
        const workbookRef = driveItemRef(getDefaultDriveRef(), workbook.id);

        try {
            await calculateWorkbook(workbookRef, "FullRebuild");
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
