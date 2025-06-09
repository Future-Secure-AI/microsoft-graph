// TODO: Move to WorkbookTable.ts
/**
 * Reference to a table in a worksheet.
 * @module WorkbookTableRef
 * @category Models
 */
import type { WorkbookTableId } from "./WorkbookTableId.ts";
import type { WorkbookWorksheetRef } from "./WorkbookWorksheetRef.ts";

export type WorkbookTableRef = WorkbookWorksheetRef & {
	tableId: WorkbookTableId;
};
