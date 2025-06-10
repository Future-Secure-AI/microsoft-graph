/**
 * Find accessible sites that match the provided keywords.
 * @module searchSites
 * @category Operations
 */

import type { Site } from "@microsoft/microsoft-graph-types";
import type { ContextRef } from "../../models/Context.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { SiteId, SiteRef } from "../../models/Site.ts";
import { operation } from "../../services/operationInvoker.ts";
import { createSiteRef } from "../../services/site.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Find accessible sites that match the provided keywords.
 * @param contextRef Reference to the context.
 * @param search Search keywords to find matching sites.
 * @returns Array of sites that match the search criteria, each including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/site-search
 */
export default function searchSites(contextRef: ContextRef, search: string): GraphOperation<(Site & SiteRef)[]> {
	return operation({
		context: contextRef.context,
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
