// biome-ignore lint/style/useFilenamingConvention: Appropriate in this context

/**
 * Pointers to a range in a worksheet.
 * @module WorkbookRange
 * @category Models
 */

import type { Address } from "./Address.ts";
import type { WorkbookWorksheetRef } from "./WorkbookWorksheet.ts";

/**
 * Reference to a range in a workbook worksheet.
 */
export type WorkbookRangeRef = WorkbookWorksheetRef & {
	address: Address;
};
