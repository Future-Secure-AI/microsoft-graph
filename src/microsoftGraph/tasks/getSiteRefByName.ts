import ProtocolError from "../errors/ProtocolError.ts";
import type { HostName } from "../models/HostName.ts";
import type { SiteName } from "../models/SiteName.ts";
import type { SiteRef } from "../models/SiteRef.ts";
import getSiteByNameOp from "../operations/site/getSiteByName.ts";

export default async function getSiteRefByName(hostName: HostName, siteName: SiteName): Promise<SiteRef> {
    const site = await getSiteByNameOp(hostName, siteName);

    if (!site.id) {
        throw new ProtocolError("SiteID not set");
    }

    return {
        siteId: site.id,
    };
}