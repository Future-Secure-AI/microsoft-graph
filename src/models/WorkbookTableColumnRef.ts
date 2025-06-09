// TODO: Move to WorkbookTable.ts
/**
 * Reference to a column in a table in a worksheet.
 * @module WorkbookTableColumnRef
 * @category Models
 */
import type { ColumnName } from "./ColumnName.ts";
import type { WorkbookTableRef } from "./WorkbookTableRef.ts";

export type WorkbookTableColumnRef = WorkbookTableRef & {
	column: ColumnName;
};
