import type { DriveItemRef } from "../drive/driveItem/DriveItemRef.js";
import type { WorkbookSessionId } from "./workbookSession/WorkbookSessionId.js";

export type WorkbookRef = DriveItemRef & {
    sessionId?: WorkbookSessionId;
};
