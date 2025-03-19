import ProtocolError from "../errors/ProtocolError.js";
import type { HostName } from "../models/HostName.js";
import type { SiteName } from "../models/SiteName.js";
import type { SiteRef } from "../models/SiteRef.js";
import getSiteByNameOp from "../operations/site/getSiteByName.js";

export default async function getSiteRefByName(hostName: HostName, siteName: SiteName): Promise<SiteRef> {
    const site = await getSiteByNameOp(hostName, siteName);

    if (!site.id) {
        throw new ProtocolError("SiteID not set");
    }

    return {
        siteId: site.id,
    };
}