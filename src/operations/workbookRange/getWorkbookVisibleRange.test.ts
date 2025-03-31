import { describe, expect, it } from "vitest";
import { sequential } from "../../graphApi.ts";
import type { RangeAddress } from "../../models/RangeAddress.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../../services/workbookWorksheet.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import getWorkbookVisibleRange from "./getWorkbookVisibleRange.ts";
import updateWorkbookRange from "./updateWorkbookRange.ts";

describe("getWorkbookRangeVisible", () => {
	it("can retrieve the visible view of a range in an existing workbook", async () => {
		const address = "A1:B2" as RangeAddress;
		const values = [
			[1, 2],
			[3, 4],
		];

		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, address);

		try {
			await updateWorkbookRange(rangeRef, { values: values });
			await calculateWorkbook(workbook);

			const visibleView = await getWorkbookVisibleRange(rangeRef);
			expect(visibleView).toBeDefined();
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});

	it("can retrieve the visible view of a range in an existing workbook sequential", async () => {
		const address = "A1:B2" as RangeAddress;
		const values = [
			[1, 2],
			[3, 4],
		];

		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, address);

		try {
			const [_, __, visibleView] = await sequential(updateWorkbookRange(rangeRef, { values: values }), calculateWorkbook(workbook), getWorkbookVisibleRange(rangeRef));
			expect(visibleView).toBeDefined();
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});

	it("omits hidden row from the visible view of a range", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
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
			await deleteDriveItemWithRetry(workbook);
		}
	});

	it("omits hidden column from the visible view of a range", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
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
			await deleteDriveItemWithRetry(workbook);
		}
	});
});
