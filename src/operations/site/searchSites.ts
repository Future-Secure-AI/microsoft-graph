import type { Site } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { ContextRef } from "../../models/ContextRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { SiteId } from "../../models/SiteId.ts";
import type { SiteRef } from "../../models/SiteRef.ts";
import { createSiteRef } from "../../services/site.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Find accessible sites that match the provided keywords.
 *
 * @param contextRef - A reference to the context.
 * @param search - The search keywords to find matching sites.
 * @returns An array of sites that match the search criteria, each including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/site-search
 */
export default function searchSites(contextRef: ContextRef, search: string): GraphOperation<(Site & SiteRef)[]> {
	return operation({
		contextId: contextRef.contextId,
		method: "GET",
		path: generatePath("/sites?search={search}", { search }),
		headers: {},
		body: null,
		responseTransform: (response) => {
			const list = response as { value: Site[] };

			const sites = list.value.map((site) => {
				const siteId = site.id as SiteId;
				const siteRef = createSiteRef(contextRef, siteId);

				return {
					...site,
					...siteRef,
				};
			});

			return sites;
		},
	});
}
