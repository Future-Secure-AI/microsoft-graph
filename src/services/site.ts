import ProtocolError from "../errors/ProtocolError.ts";
import type { SiteId } from "../models/SiteId.ts";
import type { SiteRef } from "../models/SiteRef.ts";
import { defaultSiteIdEnv } from "./configuration.ts";

export function siteRef(siteId: SiteId | undefined): SiteRef {
    if (!siteId) {
        throw new ProtocolError("SiteID is missing");
    }

    return {
        siteId
    };
}


export function getDefaultSiteRef(): SiteRef {
    return {
        siteId: defaultSiteIdEnv() as SiteId,
    };
}