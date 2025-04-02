import type { ColumnAddress } from "./Address.ts";
import type { WorkbookTableRef } from "./WorkbookTableRef.ts";

export type WorkbookTableColumnRef = WorkbookTableRef & {
	column: ColumnAddress;
};
