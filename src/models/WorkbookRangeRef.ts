// TODO: Move to WorkbookRange.ts
/**
 * Reference to a range in a worksheet.
 * @module WorkbookRangeRef
 * @category Models
 */
import type { Address } from "./Address.ts";
import type { WorkbookWorksheetRef } from "./WorkbookWorksheetRef.ts";

export type WorkbookRangeRef = WorkbookWorksheetRef & {
	address: Address;
};
