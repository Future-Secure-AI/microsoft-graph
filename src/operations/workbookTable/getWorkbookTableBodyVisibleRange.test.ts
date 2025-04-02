import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { createWorkbookTableColumnRef } from "../../services/workbookTableColumn.ts";
import { createDefaultWorkbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import updateWorkbookRange from "../workbookRange/updateWorkbookRange.ts";
import applyWorkbookTableColumnFilter from "./applyWorkbookTableColumnFilter.ts";
import createWorkbookTable from "./createWorkbookTable.ts";
import getWorkbookTableBodyVisibleRange from "./getWorkbookTableBodyVisibleRange.ts";

describe("getWorkbookTableBodyVisibleRange", () => {
	it("can retrieve the visible body range of a table from an existing workbook", async () => {
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
					["A", "B", "C", "D"],
					[1, 2, 3, 4],
					[5, 6, 7, 8],
					[9, 10, 11, 12],
				],
			});

			await applyWorkbookTableColumnFilter(createWorkbookTableColumnRef(table, "A"), {
				filterOn: "custom",
				criterion1: ">5",
			});
			await calculateWorkbook(workbook);

			const visible = await getWorkbookTableBodyVisibleRange(table);

			expect(visible.values).toEqual([[9, 10, 11, 12]]);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});
});
