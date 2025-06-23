import { describe, expect, it } from "vitest";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import createWorkbookAndStartSession from "../../tasks/createWorkbookAndStartSession.ts";
import safeDeleteWorkbook from "../../tasks/safeDeleteWorkbook.ts";
import createWorkbookWorksheet from "../workbookWorksheet/createWorkbookWorksheet.ts";
import getWorkbookRangeAlignment from "./getWorkbookRangeAlignment.ts";
import { default as setWorkbookRangeFormat } from "./setWorkbookRangeFormat.ts";

describe("setWorkbookRangeFormat", () => {
	it("can update the general format of a workbook range", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbookAndStartSession(driveRef, workbookPath);

		try {
			const worksheet = await createWorkbookWorksheet(workbook);
			const rangeRef = createWorkbookRangeRef(worksheet, "A1:B2");

			await setWorkbookRangeFormat(rangeRef, {
				wrapText: true,
			});

			const format = await getWorkbookRangeAlignment(rangeRef);
			expect(format.wrapText).toBe(true);
		} finally {
			await safeDeleteWorkbook(workbook);
		}
	});
});
