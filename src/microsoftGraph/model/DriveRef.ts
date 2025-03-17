import type { DriveId } from "./DriveId.js";
import type { SiteRef } from "./SiteRef.js";

export type DriveRef = SiteRef & {
    driveId: DriveId;
};
