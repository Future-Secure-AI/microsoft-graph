import type { DriveItemRef } from "./DriveItemRef.js";
import type { WorkbookSessionId } from "./WorkbookSessionId.js";

export type WorkbookRef = DriveItemRef & {
    sessionId?: WorkbookSessionId;
};
