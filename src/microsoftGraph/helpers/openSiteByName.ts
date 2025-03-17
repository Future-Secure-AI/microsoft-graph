import execute from "../execute.js";
import getSiteByName from "../sites/getSiteByName.js";
import type { HostName } from "../sites/HostName.js";
import type { SiteName } from "../sites/SiteName.js";
import type { SiteRef } from "../sites/SiteRef.js";

/** Convenience helper to get a reference to a site by name. Avoid using this however and code to siteId instead for a less brittle and performant result. */
export default async function openSiteByName(hostName: HostName, siteName: SiteName): Promise<SiteRef> {
    const [site] = await execute(getSiteByName(hostName, siteName));

    if (site.id === undefined) // TODO: This may need to be refined on testing
        throw new Error(`Site ${siteName} not found in host ${hostName}`);

    return {
        siteId: site.id,
    };
}