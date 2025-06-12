import { describe, expect, it } from "vitest";
import type { BorderWeight } from "../../models/Border.ts";
import type { Color } from "../../models/Color.ts";
import { getDefaultDriveRef } from "../../services/drive.ts";
import { driveItemPath } from "../../services/driveItem.ts";
import { generateTempFileName } from "../../services/temporaryFiles.ts";
import { createWorkbookRangeRef } from "../../services/workbookRange.ts";
import tryDeleteDriveItem from "../../tasks/tryDeleteDriveItem.ts";
import createWorkbook from "../workbook/createWorkbook.ts";
import createWorkbookWorksheet from "../workbookWorksheet/createWorkbookWorksheet.ts";
import listWorkbookRangeBorders from "./listWorkbookRangeBorders.ts";
import setWorkbookRangeBorder from "./setWorkbookRangeBorder.ts";

describe("listWorkbookRangeBorders", () => {
	it("can list borders after setting with setWorkbookRangeBorder", async () => {
		const workbookName = generateTempFileName("xlsx");
		const workbookPath = driveItemPath(workbookName);
		const driveRef = getDefaultDriveRef();
		const workbook = await createWorkbook(driveRef, workbookPath);

		try {
			const worksheet = await createWorkbookWorksheet(workbook);
			const rangeRef = createWorkbookRangeRef(worksheet, "A1:B2");

			const color = "#00FF00" as Color;
			const style = "Continuous";
			const weight = "Medium" as BorderWeight;

			await setWorkbookRangeBorder(rangeRef, "EdgeBottom", {
				color: color,
				style: style,
				weight: weight,
			});

			const borders = await listWorkbookRangeBorders(rangeRef);
			const bottomBorder = borders.find((b) => b.sideIndex === "EdgeBottom");
			if (!bottomBorder) {
				throw new Error("EdgeBottom border not found");
			}
			expect(bottomBorder.color).toBe(color);
			expect(bottomBorder.style).toBe(style);
			expect(bottomBorder.weight).toBe(weight);
		} finally {
			await tryDeleteDriveItem(workbook);
		}
	});
});
