import { describe, expect, it } from "vitest";
import type { CellRangeAddress } from "../../models/Address.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../../services/workbookWorksheet.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import updateWorkbookRange from "../workbookRange/updateWorkbookRange.ts";
import getWorkbookWorksheetUsedRangeAddress from "./getWorkbookWorksheetUsedRangeAddress.ts";

const values = [
	[1, 2],
	[3, 4],
];

describe("getWorkbookWorksheetUsedRangeAddress", () => {
	it("can retrieve the used range from an existing workbook", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const inputAddress = "A1:B2" as CellRangeAddress;
		const rangeRef = createWorkbookRangeRef(worksheetRef, inputAddress);

		try {
			await updateWorkbookRange(rangeRef, {
				values: values,
			});

			await calculateWorkbook(workbook);

			const outputAddress = await getWorkbookWorksheetUsedRangeAddress(worksheetRef);
			expect(outputAddress).toEqual(inputAddress);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});
});
