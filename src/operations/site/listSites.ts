/**
 * List sites in your company geography.
 * @module listSites
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
 * List sites in your company geography.
 * @param contextRef Reference to the context.
 * @returns Array of sites, each including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/site-list
 */
export default function listSites(contextRef: ContextRef): GraphOperation<(Site & SiteRef)[]> {
	return operation({
		context: contextRef.context,
		method: "GET",
		path: generatePath("/sites?search=*", {}), // TODO: Implement search parameter properly. Without this not all are shown.
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
