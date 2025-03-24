import ProtocolError from "../errors/ProtocolError.ts";
import type { DriveId } from "../models/DriveId.ts";
import type { DriveRef } from "../models/DriveRef.ts";
import type { SiteId } from "../models/SiteId.ts";
import type { SiteRef } from "../models/SiteRef.ts";
import { defaultDriveIdEnv, defaultSiteIdEnv } from "./configuration.ts";

export function driveRef(siteRef: SiteRef, driveId: DriveId | undefined): DriveRef {
    if (!driveId) {
        throw new ProtocolError("DriveID is missing");
    }

    return {
        siteId: siteRef.siteId,
        driveId,
    };
}

export function getDefaultDriveRef(): DriveRef {
    return {
        siteId: defaultSiteIdEnv() as SiteId,
        driveId: defaultDriveIdEnv() as DriveId
    };
}