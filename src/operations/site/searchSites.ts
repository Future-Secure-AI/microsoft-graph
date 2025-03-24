import type { Site } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { SiteId } from "../../models/SiteId.ts";
import type { SiteRef } from "../../models/SiteRef.ts";
import { siteRef } from "../../services/site.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Find accessible sites that match keywords provided. @see https://learn.microsoft.com/en-us/graph/api/site-search */
export default function searchSites(search: string): GraphOperation<(Site & SiteRef)[]> {
    return operation({
        method: "GET",
        path: generatePath("/sites?search={search}", { search }),
        headers: {},
        body: null,
        responseTransform: response => {
            const list = response as { value: Site[]; };

            const sites = list.value.map(site => {
                const ref = siteRef(site.id as SiteId);

                return {
                    ...site,
                    ...ref,
                }
            });

            return sites;
        }
    });
}
