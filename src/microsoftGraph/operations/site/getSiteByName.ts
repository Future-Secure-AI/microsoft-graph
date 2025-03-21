import ProtocolError from "../../errors/ProtocolError.ts";
import { operation } from "../../graphApi.ts";
import type { Site } from "../../models/Dto.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { HostName } from "../../models/HostName.ts";
import type { SiteName } from "../../models/SiteName.ts";
import type { SiteRef } from "../../models/SiteRef.ts";
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

            if (!site.id) {
                throw new ProtocolError("SiteID not set");
            }

            return {
                ...site,
                siteId: site.id,
            };
        }
    });
}
