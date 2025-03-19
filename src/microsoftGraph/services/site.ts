import ProtocolError from "../errors/ProtocolError.js";
import type { SiteId } from "../models/SiteId.js";
import type { SiteRef } from "../models/SiteRef.js";

export function siteRef(siteId: SiteId | undefined): SiteRef {
    if (!siteId) {
        throw new ProtocolError("SiteID is missing");
    }

    return {
        siteId
    };
}