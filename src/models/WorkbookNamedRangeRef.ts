/**
 * Reference to a named range.
 * @module WorkbookNamedRangeRef
 * @category Models
 */

import type { WorkbookRangeName } from "./WorkbookRangeName.ts";
import type { WorkbookRef } from "./WorkbookRef.ts";

export type WorkbookNamedRangeRef = WorkbookRef & {
	rangeName: WorkbookRangeName;
};
