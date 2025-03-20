import ProtocolError from "../errors/ProtocolError.ts";
import type { DriveId } from "../models/DriveId.ts";
import type { DriveRef } from "../models/DriveRef.ts";
import type { SiteRef } from "../models/SiteRef.ts";

export function driveRef(siteRef: SiteRef, driveId: DriveId | undefined): DriveRef {
    if (!driveId) {
        throw new ProtocolError("DriveID is missing");
    }

    return {
        ...siteRef,
        driveId,
    };
}