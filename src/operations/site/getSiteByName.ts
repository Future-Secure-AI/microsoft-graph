import type { Site } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { HostName } from "../../models/HostName.ts";
import type { SiteId } from "../../models/SiteId.ts";
import type { SiteName } from "../../models/SiteName.ts";
import type { SiteRef } from "../../models/SiteRef.ts";
import { siteRef } from "../../services/site.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Get site by name. @see https://learn.microsoft.com/en-us/graph/api/site-getbypath */
export default function getSiteByName(hostName: HostName, siteName: SiteName): GraphOperation<Site & SiteRef> {
    return operation({
        method: "GET",
        path: generatePath("/sites/{host-name}:/sites/{site-name}", { hostName, siteName }),
        headers: {},
        body: null,
        responseTransform: (response: unknown) => {
            const site = response as Site;
            const ref = siteRef(site.id as SiteId);
            return {
                ...site,
                ...ref
            };
        }
    });
}
