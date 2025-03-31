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
import deleteWorkbookRange from "./deleteWorkbookRange.ts";
import getWorkbookWorksheetRange from "./getWorkbookWorksheetRange.ts";
import updateWorkbookRange from "./updateWorkbookRange.ts";

const values = [
	[1, 2],
	[3, 4],
];

const clearedValues = [
	["", ""],
	["", ""],
];

describe("deleteWorkbookRange", () => {
	it("can delete a range in an existing workbook", async () => {
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

			await deleteWorkbookRange(rangeRef, "Up");
			await calculateWorkbook(workbook);

			const deletedRange = await getWorkbookWorksheetRange(rangeRef);
			expect(deletedRange.values).toEqual(clearedValues);
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});

	it("can delete a range in an existing workbook sequential", async () => {
		const values = [
			[1, 2],
			[3, 4],
		];

		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);
		const worksheetRef = createWorkbookWorksheetRef(workbook, defaultWorkbookWorksheetId);
		const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B2");

		try {
			const [_, __, ___, deletedRange] = await sequential(
				updateWorkbookRange(rangeRef, {
					values: values,
				}),
				deleteWorkbookRange(rangeRef, "Up"),
				calculateWorkbook(workbook),
				getWorkbookWorksheetRange(rangeRef),
			);

			expect(deletedRange.values).toEqual(clearedValues);
		} finally {
			await deleteDriveItemWithRetry(workbook);
		}
	});
});
