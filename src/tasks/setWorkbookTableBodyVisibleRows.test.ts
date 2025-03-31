import { describe, expect, it } from "vitest";
import calculateWorkbook from "../operations/workbook/calculateWorkbook.ts";
import createWorkbook from "../operations/workbook/createWorkbook.ts";
import updateWorkbookRange from "../operations/workbookRange/updateWorkbookRange.ts";
import createWorkbookTable from "../operations/workbookTable/createWorkbookTable.ts";
import { getDefaultDriveRef } from "../services/drive.ts";
import { driveItemPath } from "../services/driveItem.ts";
import { generateTempFileName } from "../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../services/workbookRange.ts";
import { createDefaultWorkbookWorksheetRef } from "../services/workbookWorksheet.ts";
import deleteDriveItemWithRetry from "./deleteDriveItemWithRetry.ts";
import { getWorkbookTableVisibleBody } from "./getWorkbookTableVisibleBody.ts";
import setRowHidden from "./setRowHidden.ts";
import { setWorkbookTableBodyVisibleRows } from "./setWorkbookTableBodyVisibleRows.ts";

describe("setWorkbookTableBodyVisibleRows", () => {
	it("writes input rows to visible rows of a table", { timeout: 30000 }, async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);

		try {
			const worksheetRef = createDefaultWorkbookWorksheetRef(workbook);
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:D4");
			const table = await createWorkbookTable(rangeRef, true);

			await updateWorkbookRange(rangeRef, {
				values: [
					["Header1", "Header2", "Header3", "Header4"],
					["OldValue1", "OldValue2", "OldValue3", "OldValue4"],
					["OldValue5", "OldValue6", "OldValue7", "OldValue8"], // <== Will be hidden and therefore preserved
					["OldValue9", "OldValue10", "OldValue11", "OldValue12"],
				],
			});

			await setRowHidden(createWorkbookRangeRef(worksheetRef, "A3:A3"), true);
			await calculateWorkbook(workbook);

			await setWorkbookTableBodyVisibleRows(table, [
				["NewValue1", "NewValue2", "NewValue3", "NewValue4"],
				["NewValue5", "NewValue6", "NewValue7", "NewValue8"],
			]);

			const visibleBodyRange = await getWorkbookTableVisibleBody(table);
			expect(visibleBodyRange.values).toEqual([
				["NewValue1", "NewValue2", "NewValue3", "NewValue4"],
				["OldValue5", "OldValue6", "OldValue7", "OldValue8"],
				["NewValue5", "NewValue6", "NewValue7", "NewValue8"],
			]);
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});

	it("writes input rows to visible rows of a table with insert", { timeout: 30000 }, async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);

		try {
			const worksheetRef = createDefaultWorkbookWorksheetRef(workbook);
			const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:D3");
			const table = await createWorkbookTable(rangeRef, true);

			await updateWorkbookRange(rangeRef, {
				values: [
					["Header1", "Header2", "Header3", "Header4"],
					["OldValue1", "OldValue2", "OldValue3", "OldValue4"],
					["OldValue5", "OldValue6", "OldValue7", "OldValue8"], // <== Will be hidden and therefore preserved
				],
			});

			await setRowHidden(createWorkbookRangeRef(worksheetRef, "A3:A3"), true);
			await calculateWorkbook(workbook);

			await setWorkbookTableBodyVisibleRows(table, [
				["NewValue1", "NewValue2", "NewValue3", "NewValue4"],
				["NewValue5", "NewValue6", "NewValue7", "NewValue8"],
			]);

			const visibleBodyRange = await getWorkbookTableVisibleBody(table);
			expect(visibleBodyRange.values).toEqual([
				["NewValue1", "NewValue2", "NewValue3", "NewValue4"],
				["OldValue5", "OldValue6", "OldValue7", "OldValue8"],
				["NewValue5", "NewValue6", "NewValue7", "NewValue8"],
			]);
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});
});
