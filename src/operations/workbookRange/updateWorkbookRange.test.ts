import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { sequential } from "../../services/operationInvoker.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../../services/workbookWorksheet.ts";
import createWorkbookAndStartSession from "../../tasks/createWorkbookAndStartSession.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import getWorkbookWorksheetRange from "./getWorkbookWorksheetRange.ts";
import updateWorkbookRange from "./updateWorkbookRange.ts";

const values = [
	[1, 2],
	[3, 4],
];

describe("updateWorkbookRange", () => {
	it("can update a range in an existing workbook", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");

		try {
			await updateWorkbookRange(rangeRef, {
				values: values,
			});
			await calculateWorkbook(workbook);

			const updatedRange = await getWorkbookWorksheetRange(rangeRef);
			expect(updatedRange.values).toEqual(values);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("can update a range in an existing workbook sequential", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");

		try {
			const [_, __, updatedRange] = await sequential(
				updateWorkbookRange(rangeRef, {
					values: values,
				}),
				calculateWorkbook(workbook),
				getWorkbookWorksheetRange(rangeRef),
			);
			expect(updatedRange.values).toEqual(values);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
