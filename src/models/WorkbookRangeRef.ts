import type { Address } from "./Address.ts";
import type { WorkbookWorksheetRef } from "./WorkbookWorksheetRef.ts";

export type WorkbookRangeRef = WorkbookWorksheetRef & {
	address: Address;
};
