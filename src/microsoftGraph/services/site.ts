import ProtocolError from "../errors/ProtocolError.js";
import type { DriveRef } from "../models/DriveRef.js";
import type { SiteId } from "../models/SiteId.js";
import type { SiteRef } from "../models/SiteRef.js";

export function siteRef(driveRef: DriveRef, siteId: SiteId | undefined): SiteRef {
    if (!siteId) {
        throw new ProtocolError("SiteID is missing");
    }

    return {
        ...driveRef,
        siteId
    };
}