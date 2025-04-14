import type { ColumnName } from "../models/ColumnName.ts";
import type { WorkbookTableColumnRef } from "../models/WorkbookTableColumnRef.ts";
import type { WorkbookTableRef } from "../models/WorkbookTableRef.ts";

/**
 * Creates a reference to a workbook table column.
 * @param tableRef - The reference to the worksheet containing the table.
 * @param column  -  Name of the table column
 * @returns A reference to the workbook table.
 * @throws Error if the table ID is missing.
 */
export function createWorkbookTableColumnRef(tableRef: WorkbookTableRef, column: ColumnName | string | undefined): WorkbookTableColumnRef {
	if (!column) {
		throw new Error("column is missing");
	}

	return {
		contextId: tableRef.contextId,
		siteId: tableRef.siteId,
		driveId: tableRef.driveId,
		itemId: tableRef.itemId,
		worksheetId: tableRef.worksheetId,
		sessionId: tableRef.sessionId,
		tableId: tableRef.tableId,
		column: column as ColumnName,
	};
}
