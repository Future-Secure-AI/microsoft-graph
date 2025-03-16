import type { SiteRef } from "../sites/SiteRef.js";
import type { DriveId } from "./DriveId.js";

export type DriveRef = SiteRef & {
    driveId: DriveId;
};
