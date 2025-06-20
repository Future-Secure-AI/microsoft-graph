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

export type ListSitesResponse = {
	value: (Site & SiteRef)[];
	"@odata.nextLink": string | null;
};

export type SiteList = {
	sites: (Site & SiteRef)[];
	nextLink: URL | null;
};

/**
 * List sites in your company geography.
 * @param contextRef Reference to the context.
 * @param take Maximum number of items to retrieve. Defaults to 1000.
 * @returns Array of sites, each including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/site-list
 */
export default function listSites(contextRef: ContextRef, take = 1000): GraphOperation<SiteList> {
	return operation({
		context: contextRef.context,
		method: "GET",
		path: generatePath(`/sites?$top=${take}`, {}), // TODO: Implement search parameter properly. Without this not all are shown.
		headers: {},
		body: null,
		responseTransform: (response) => {
			const result = response as ListSitesResponse;

			return {
				sites: result.value.map((site) => {
					const siteRef = createSiteRef(contextRef, site.id as SiteId);

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
