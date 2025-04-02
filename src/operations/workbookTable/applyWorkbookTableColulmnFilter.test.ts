import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { createWorkbookTableColumnRef } from "../../services/workbookTableColumn.ts";
import { createDefaultWorkbookWorksheetRef } from "../../services/workbookWorksheet.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import { getWorkbookTableVisibleBody } from "../../tasks/getWorkbookTableVisibleBody.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import updateWorkbookRange from "../workbookRange/updateWorkbookRange.ts";
import applyWorkbookTableColumnFilter from "./applyWorkbookTableColumnFilter.ts";
import createWorkbookTable from "./createWorkbookTable.ts";

describe("applyWorkbookTableColumnFilter", () => {
	it("can apply a filter to a workbook table column", async () => {
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

			const visible = await getWorkbookTableVisibleBody(table);

			expect(visible.values).toBe([[9, 10, 11, 12]]);
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});
});
