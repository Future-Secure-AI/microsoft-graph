import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { sequential } from "../../services/operationInvoker.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { createDefaultWorkbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import createWorkbookAndStartSession from "../../tasks/createWorkbookAndStartSession.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import updateWorkbookRange from "../workbookRange/updateWorkbookRange.ts";
import createWorkbookTable from "./createWorkbookTable.ts";
import getWorkbookTableBodyRange from "./getWorkbookTableBodyRange.ts";

describe("getWorkbookTableBodyRange", () => {
	it("can retrieve the data body range of a table", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);

		try {
			const worksheetRef = createDefaultWorkbookWorksheetRef(workbook);
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

			const [_, dataBodyRange] = await sequential(calculateWorkbook(workbook), getWorkbookTableBodyRange(table));
			expect(dataBodyRange.address).toBeTruthy();
			expect(dataBodyRange.values).toEqual([
				["Value1", "Value2", "Value3", "Value4"],
				["Value5", "Value6", "Value7", "Value8"],
				["Value9", "Value10", "Value11", "Value12"],
			]);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
