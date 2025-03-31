import { describe, expect, it } from "vitest";
import { sequential } from "../../graphApi.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import { createWorkbookWorksheetRef, defaultWorkbookWorksheetId } from "../../services/workbookWorksheet.ts";
import deleteDriveItemWithRetry from "../../tasks/deleteDriveItemWithRetry.ts";
import calculateWorkbook from "../workbook/calculateWorkbook.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import clearWorkbookRange from "./clearWorkbookRange.ts";
import getWorkbookRange from "./getWorkbookRange.ts";
import updateWorkbookRange from "./updateWorkbookRange.ts";

const values = [
	[1, 2],
	[3, 4],
];
const clearedValues = [
	["", ""],
	["", ""],
];

describe("clearWorkbookRange", () => {
	it("can clear a range in an existing workbook", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");

		try {
			await updateWorkbookRange(rangeRef, {
				values: values,
			});

			await clearWorkbookRange(rangeRef);
			await calculateWorkbook(workbook);

			const clearedRange = await getWorkbookRange(rangeRef);
			expect(clearedRange.values).toEqual(clearedValues);
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});

	it("can clear a range in an existing workbook sequential", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");

		try {
			const [_, __, ___, clearedRange] = await sequential(
				updateWorkbookRange(rangeRef, {
					values: values,
				}),
				clearWorkbookRange(rangeRef),
				calculateWorkbook(workbook),
				getWorkbookRange(rangeRef),
			);

			expect(clearedRange.values).toEqual(clearedValues);
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});
});
