import type { DriveItemRef } from "../drives/driveItem/DriveItemRef.js";
import type { WorkbookSessionId } from "./workbookSession/WorkbookSessionId.js";

export type WorkbookRef = DriveItemRef & {
    sessionId?: WorkbookSessionId;
};
