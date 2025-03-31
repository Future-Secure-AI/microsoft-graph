import type { RangeAddress as WorkbookWorksheetRangeAddress } from "./RangeAddress.ts";
import type { WorkbookWorksheetRef } from "./WorkbookWorksheetRef.ts";

export type WorkbookRangeRef = WorkbookWorksheetRef & {
	address: WorkbookWorksheetRangeAddress;
};
