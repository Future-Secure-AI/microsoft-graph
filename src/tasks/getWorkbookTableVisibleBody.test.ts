import { describe, expect, it } from "vitest";
import calculateWorkbook from "../operations/workbook/calculateWorkbook.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import createWorkbookTable from "../operations/workbookTable/createWorkbookTable.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath } from "../services/driveItem.ts";
import { sleep } from "../services/sleep.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../services/workbookWorksheet.ts";
import deleteDriveItemWithRetry from "./deleteDriveItemWithRetry.ts";
import { getWorkbookTableVisibleBody } from "./getWorkbookTableVisibleBody.ts";

describe("getWorkbookTableVisibleBody", () => {
	it("can retrieve the visible body range of a table", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);

		try {
			const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:D4");
			const table = await createWorkbookTable(rangeRef, true);

			await updateWorkbookRange(rangeRef, {
				values: [
					["Header1", "Header2", "Header3", "Header4"],
					["Value1", "Value2", "Value3", "Value4"],
					["Value5", "Value6", "Value7", "Value8"],
					["Value9", "Value10", "Value11", "Value12"],
				],
			});
			await calculateWorkbook(workbook);

			const visibleBodyRange = await getWorkbookTableVisibleBody(table);
			expect(visibleBodyRange.values).toEqual([
				["Value1", "Value2", "Value3", "Value4"],
				["Value5", "Value6", "Value7", "Value8"],
				["Value9", "Value10", "Value11", "Value12"],
			]);
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});

	it("omits hidden rows from the visible body range of a table", async () => {
		// TODO: This test is flappy and I haven't worked out why yet
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);

		try {
			const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:D4");
			const table = await createWorkbookTable(rangeRef, true);

			await updateWorkbookRange(rangeRef, {
				values: [
					["Header1", "Header2", "Header3", "Header4"],
					["Value1", "Value2", "Value3", "Value4"],
					["Value5", "Value6", "Value7", "Value8"],
					["Value9", "Value10", "Value11", "Value12"],
				],
			});

			const hiddenRange = createWorkbookRangeRef(worksheetRef, "2:2");
			await updateWorkbookRange(hiddenRange, { rowHidden: true });
			await calculateWorkbook(workbook);
			await sleep(2000);

			const visibleBodyRange = await getWorkbookTableVisibleBody(table);
			expect(visibleBodyRange.values).toEqual([
				["Value5", "Value6", "Value7", "Value8"],
				["Value9", "Value10", "Value11", "Value12"],
			]);
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});

	it("omits hidden columns from the visible body range of a table", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);

		try {
			const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:D4");
			const table = await createWorkbookTable(rangeRef, true);

			await updateWorkbookRange(rangeRef, {
				values: [
					["Header1", "Header2", "Header3", "Header4"],
					["Value1", "Value2", "Value3", "Value4"],
					["Value5", "Value6", "Value7", "Value8"],
					["Value9", "Value10", "Value11", "Value12"],
				],
			});

			const hiddenRange = createWorkbookRangeRef(worksheetRef, "B:B");
			await updateWorkbookRange(hiddenRange, { columnHidden: true });
			await calculateWorkbook(workbook);

			const visibleBodyRange = await getWorkbookTableVisibleBody(table);
			expect(visibleBodyRange.values).toEqual([
				["Value1", "Value3", "Value4"],
				["Value5", "Value7", "Value8"],
				["Value9", "Value11", "Value12"],
			]);
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});
});
