import { describe, expect, it } from "vitest";
import { sequential } from "../../graphApi.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import updateWorkbookRange from "../workbookRange/updateWorkbookRange.ts";
import createWorkbookWorksheet from "../workbookWorksheet/createWorkbookWorksheet.ts";
import createWorkbookTable from "./createWorkbookTable.ts";
import getWorkbookTableBodyRange from "./getWorkbookTableBodyRange.ts";

describe("getWorkbookTableBodyRange", () => {
	it("can retrieve the data body range of a table", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);

		try {
			const worksheet = await createWorkbookWorksheet(workbook);
			const rangeRef = createWorkbookRangeRef(worksheet, "A1:D4");
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

			const [_, dataBodyRange] = await sequential(calculateWorkbook(workbook), getWorkbookTableBodyRange(table));
			expect(dataBodyRange.address).toBeTruthy();
			expect(dataBodyRange.values).toEqual([
				["Value1", "Value2", "Value3", "Value4"],
				["Value5", "Value6", "Value7", "Value8"],
				["Value9", "Value10", "Value11", "Value12"],
			]);
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});
});
