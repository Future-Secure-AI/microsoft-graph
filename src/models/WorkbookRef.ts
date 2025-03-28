import type { DriveItemRef } from "./DriveItemRef.ts";
import type { WorkbookSessionId } from "./WorkbookSessionId.ts";

export type WorkbookRef = DriveItemRef & {
	sessionId?: WorkbookSessionId | undefined;
};
