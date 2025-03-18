import type { DriveId } from "../models/DriveId.js";
import type { DriveRef } from "../models/DriveRef.js";
import type { SiteId } from "../models/SiteId.js";

export default function getDriveRef(siteId: SiteId, driveId: DriveId): DriveRef {
    return {
        siteId,
        driveId,
    }
}

