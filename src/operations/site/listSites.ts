import type { Site } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { ContextRef } from "../../models/ContextRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { SiteId } from "../../models/SiteId.ts";
import type { SiteRef } from "../../models/SiteRef.ts";
import { createSiteRef } from "../../services/site.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * List accessible sites.
 *
 * @param contextRef - A reference to the context.
 * @returns An array of sites, each including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/site-list
 */
export default function listSites(contextRef: ContextRef): GraphOperation<(Site & SiteRef)[]> {
	return operation({
		contextId: contextRef.contextId,
		method: "GET",
		path: generatePath("/sites", {}),
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
