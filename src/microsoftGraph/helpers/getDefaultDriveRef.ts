import type { DriveRef } from "../models/DriveRef.js";
import { defaultDriveId, defaultSiteId } from "../services/configuration.js";

export default function getDefaultDriveRef(): DriveRef {
    return {
        siteId: defaultSiteId,
        driveId: defaultDriveId,
    };
}
