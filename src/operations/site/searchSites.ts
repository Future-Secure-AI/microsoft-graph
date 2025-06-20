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

export type SearchSitesResponse = {
	value: Site[];
	"@odata.nextLink"?: string;
};

export type SiteList = {
	sites: (Site & SiteRef)[];
	nextLink: URL | null;
};

/**
 * Find accessible sites that match the provided keywords.
 * @param contextRef Reference to the context.
 * @param search Search keywords to find matching sites.
 * @returns Object containing array of sites and nextLink, each including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/site-search
 */
export default function searchSites(contextRef: ContextRef, search: string): GraphOperation<SiteList> {
	return operation({
		context: contextRef.context,
		method: "GET",
		path: generatePath("/sites?search={search}&$top=1000", { search }),
		headers: {},
		body: null,
		responseTransform: (response) => {
			const result = response as SearchSitesResponse;
			return {
				sites: result.value.map((site) => {
					const siteId = site.id as SiteId;
					const siteRef = createSiteRef(contextRef, siteId);
					return {
						...site,
						...siteRef,
					};
				}),
				nextLink: result["@odata.nextLink"] ? new URL(result["@odata.nextLink"]) : null,
			};
		},
	});
}
