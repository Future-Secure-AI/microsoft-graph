import ProtocolError from "../errors/ProtocolError.js";
import type { DriveId } from "../models/DriveId.js";
import type { DriveRef } from "../models/DriveRef.js";
import type { SiteRef } from "../models/SiteRef.js";

export function driveRef(siteRef: SiteRef, driveId: DriveId | undefined): DriveRef {
    if (!driveId) {
        throw new ProtocolError("DriveID is missing");
    }

    return {
        ...siteRef,
        driveId,
    };
}