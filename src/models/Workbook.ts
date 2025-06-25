/**
 * Pointers to a workbook.
 * @module Workbook
 * @category Models
 */

import type { DriveItemRef } from "./DriveItem.ts";
import type { WorkbookSessionId } from "./WorkbookSession.ts";

/**
 * Reference to a workbook.
 */
export type WorkbookRef = DriveItemRef & {
	sessionId?: WorkbookSessionId | undefined;
};
