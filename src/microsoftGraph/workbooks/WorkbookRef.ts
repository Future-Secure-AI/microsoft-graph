import type { DriveItemRef } from "../drives/DriveItemRef.js";
import type { WorkbookSessionId } from "./WorkbookSessionId.js";

export type WorkbookRef = DriveItemRef & {
    sessionId?: WorkbookSessionId;
};
