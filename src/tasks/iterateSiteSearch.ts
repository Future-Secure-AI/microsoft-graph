/**
 * Iterate accessible sites matching the provided search keywords as an async iterable.
 * @module iterateSiteSearch
 * @category Tasks
 */

import type { Site } from "@microsoft/microsoft-graph-types";
import type { ContextRef } from "../models/Context.ts";
import type { SiteRef } from "../models/Site.ts";
import searchSites from "../operations/site/searchSites.ts";
import { executeHttpRequest } from "../services/http.ts";

/**
 * Iterate accessible sites matching the provided search keywords as an async iterable.
 * @param contextRef Reference to the context.
 * @param search Search keywords to find matching sites.
 * @returns Async iterable of sites.
 */
export default async function* iterateSiteSearch(contextRef: ContextRef, search: string): AsyncGenerator<Site & SiteRef> {
	let { sites, nextLink } = await searchSites(contextRef, search);

	for (const site of sites) {
		yield site;
	}

	while (nextLink) {
		const accessToken = await contextRef.context.generateAccessToken();

		const response = await executeHttpRequest({
			url: nextLink.toString(),
			method: "GET",
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		});
		const result = response.data as { value: (Site & SiteRef)[]; "@odata.nextLink"?: string };
		sites = result.value;
		nextLink = result["@odata.nextLink"] ? new URL(result["@odata.nextLink"]) : null;

		for (const site of sites) {
			yield site;
		}
	}
}
