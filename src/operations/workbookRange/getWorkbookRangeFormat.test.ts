import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../../services/workbookWorksheet.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import getWorkbookRangeFormat from "./getWorkbookRangeFormat.ts";
import updateWorkbookRange from "./updateWorkbookRange.ts";

describe("getWorkbookRangeFormat", () => {
	it("can retrieve the format of a range in an existing workbook", async () => {
		const driveRef = getDefaultDriveRef();
		const workbookPath = driveItemPath(generateTempFileName("xlsx"));
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");

		try {
			await updateWorkbookRange(rangeRef, {
				values: [
					[1, 2],
					[3, 4],
				],
			});

			const format = await getWorkbookRangeFormat(rangeRef);
			expect(format.horizontalAlignment).toBe("General");
			expect(format.verticalAlignment).toBe("Bottom");
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});
});
