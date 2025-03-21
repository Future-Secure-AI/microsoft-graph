import { operation } from "../../graphApi.ts";
import type { Site } from "../../models/Dto.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { SiteRef } from "../../models/SiteRef.ts";
import { siteRef } from "../../services/site.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** List sites that are available. @see https://learn.microsoft.com/en-us/graph/api/site-list */
export default function listSites(): GraphOperation<(Site & SiteRef)[]> {
    return operation({
        method: "GET",
        path: generatePath("/sites", {}),
        headers: {},
        body: null,
        responseTransform: response => {
            const list = response as { value: Site[]; };

            const sites = list.value.map(site => {
                const a = siteRef(site.id);

                return {
                    ...site,
                    ...a,
                }
            });

            return sites;
        }
    });
}
