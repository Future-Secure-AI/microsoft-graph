import type { ColumnName } from "./ColumnName.ts";
import type { WorkbookTableRef } from "./WorkbookTableRef.ts";

export type WorkbookTableColumnRef = WorkbookTableRef & {
	column: ColumnName;
};
