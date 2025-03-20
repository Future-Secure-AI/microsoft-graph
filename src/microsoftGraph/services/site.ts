import ProtocolError from "../errors/ProtocolError.ts";
import type { SiteId } from "../models/SiteId.ts";
import type { SiteRef } from "../models/SiteRef.ts";

export function siteRef(siteId: SiteId | undefined): SiteRef {
    if (!siteId) {
        throw new ProtocolError("SiteID is missing");
    }

    return {
        siteId
    };
}