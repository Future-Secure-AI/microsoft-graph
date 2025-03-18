import type { DriveId } from "../models/DriveId.js";
import type { DriveRef } from "../models/DriveRef.js";
import type { SiteId } from "../models/SiteId.js";
import { defaultDriveId, defaultSiteId } from "../services/configuration.js";

export function openDrive(siteId: SiteId, driveId: DriveId): DriveRef {
    return {
        siteId,
        driveId,
    }
}

export function openDefaultDrive(): DriveRef {
    return {
        siteId: defaultSiteId,
        driveId: defaultDriveId,
    }
}