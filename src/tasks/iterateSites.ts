/**
 * List sites in your company geography as an async iterable.
 * @module iterateSites
 * @category Tasks
 */

import type { Site } from "@microsoft/microsoft-graph-types";
import type { ContextRef } from "../models/Context.ts";
import type { SiteRef } from "../models/Site.ts";
import listSites from "../operations/site/listSites.ts";

/**
 * List sites in your company geography as an async iterable.
 * @param contextRef Reference to the context.
 * @param maxPerChunk Number of items to fetch per request. DO NOT SET EXCEPT FOR ADVANCED TUNING.
 * @returns Async iterable of sites.
 * @remarks `pageSize` should only be set for advanced performance tuning.
 */
export default async function* iterateSites(contextRef: ContextRef, maxPerChunk = 1000): AsyncGenerator<Site & SiteRef> {
	let { sites, nextLink } = await listSites(contextRef, maxPerChunk);

	for (const site of sites) {
		yield site;
	}

	while (nextLink) {
		const accessToken = await contextRef.context.generateAccessToken();

		const response = await fetch(nextLink, {
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		});
		const result = (await response.json()) as { value: (Site & SiteRef)[]; "@odata.nextLink"?: string };
		sites = result.value;
		nextLink = result["@odata.nextLink"] ? new URL(result["@odata.nextLink"]) : null;

		for (const site of sites) {
			yield site;
		}
	}
}
