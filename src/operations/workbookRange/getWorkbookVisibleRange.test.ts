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
import getWorkbookVisibleRange from "./getWorkbookVisibleRange.ts";
import updateWorkbookRange from "./updateWorkbookRange.ts";

const values = [
	[1, 2],
	[3, 4],
];
describe("getWorkbookRangeVisible", () => {
	it("can retrieve the visible view of a range in an existing workbook", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");

		try {
			await updateWorkbookRange(rangeRef, { values: values });
			await calculateWorkbook(workbook);

			const visibleView = await getWorkbookVisibleRange(rangeRef);
			expect(visibleView).toBeDefined();
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("can retrieve the visible view of a range in an existing workbook sequential", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");

		try {
			const [_, __, visibleView] = await sequential(updateWorkbookRange(rangeRef, { values: values }), calculateWorkbook(workbook), getWorkbookVisibleRange(rangeRef));
			expect(visibleView).toBeDefined();
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("omits hidden row from the visible view of a range", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);

		try {
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:C3");
			await updateWorkbookRange(rangeRef, {
				values: [
					[1, 2, 3],
					[4, 5, 6],
					[7, 8, 9],
				],
			});

			const hiddenRange = createWorkbookRangeRef(worksheetRef, "B:B");

			await updateWorkbookRange(hiddenRange, {
				columnHidden: true,
			});
			await calculateWorkbook(workbook);
			const visibleView = await getWorkbookVisibleRange(rangeRef);
			expect(visibleView.values).toEqual([
				[1, 3],
				[4, 6],
				[7, 9],
			]);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});

	it("omits hidden column from the visible view of a range", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);

		try {
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:C3");
			await updateWorkbookRange(rangeRef, {
				values: [
					[1, 2, 3],
					[4, 5, 6],
					[7, 8, 9],
				],
			});

			const hiddenRange = createWorkbookRangeRef(worksheetRef, "2:2");

			const [_, __, visibleView] = await sequential(
				updateWorkbookRange(hiddenRange, {
					rowHidden: true,
				}),
				calculateWorkbook(workbook),
				getWorkbookVisibleRange(rangeRef),
			);
			expect(visibleView.values).toEqual([
				[1, 2, 3],
				[7, 8, 9],
			]);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
