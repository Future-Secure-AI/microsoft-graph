import { describe, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import createWorkbookAndStartSession from "../../tasks/createWorkbookAndStartSession.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import calculateWorkbook from "./calculateWorkbook.ts";

describe("calculateWorkbook", () => {
	// All we're really doing is check that there's no errors

	it(`can calculate workbook with calculation type: 'Recalculate'`, async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);

		try {
			await calculateWorkbook(workbook, "Recalculate");
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it(`can calculate workbook with calculation type: 'Full'`, async () => {
		const driveRef = getDefaultDriveRef();
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		try {
			await calculateWorkbook(workbook, "Full");
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it(`can calculate workbook with calculation type: 'FullRebuild'`, async () => {
		const driveRef = getDefaultDriveRef();
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);

		try {
			await calculateWorkbook(workbook, "FullRebuild");
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
