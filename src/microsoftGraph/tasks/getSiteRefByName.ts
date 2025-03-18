import { executeSingle } from "../graphApi.js";
import type { HostName } from "../models/HostName.js";
import type { SiteName } from "../models/SiteName.js";
import type { SiteRef } from "../models/SiteRef.js";
import getSiteByName from "../operations/site/getSiteByName.js";

export default async function getSiteRefFromName(hostName: HostName, siteName: SiteName): Promise<SiteRef> {
    const site = await executeSingle(getSiteByName(hostName, siteName));

    if (site.id === undefined) {// TODO: This may need to be refined on testing
        throw new Error(`Site ${siteName} not found in host ${hostName}`);
    }

    return {
        siteId: site.id,
    };
}