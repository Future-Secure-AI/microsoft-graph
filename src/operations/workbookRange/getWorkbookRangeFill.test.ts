import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import createWorkbookAndStartSession from "../../tasks/createWorkbookAndStartSession.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import createWorkbookWorksheet from "../workbookWorksheet/createWorkbookWorksheet.ts";
import getWorkbookRangeFill from "./getWorkbookRangeFill.ts";
import setWorkbookRangeFill from "./setWorkbookRangeFill.ts";

describe("getWorkbookRangeFill", () => {
	it("can retrieve the fill format of a workbook range", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);

		try {
			const worksheet = await createWorkbookWorksheet(workbook);
			const rangeRef = createWorkbookRangeRef(worksheet, "A1:B2");

			await setWorkbookRangeFill(rangeRef, {
				color: "#FF0000",
			});

			const fill = await getWorkbookRangeFill(rangeRef);
			expect(fill.color).toBe("#FF0000");
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
