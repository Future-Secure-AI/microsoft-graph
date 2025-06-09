/**
 * Retrieve properties for a site resource.
 * @module getSite
 * @category Operations
 */

import type { Site } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { SiteRef } from "../../models/SiteRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Retrieve properties for a site resource.
 * @param siteRef Reference to the site.
 * @returns The specified site.
 * @see https://learn.microsoft.com/en-us/graph/api/site-get
 */
export default function getSite(siteRef: SiteRef): GraphOperation<Site & SiteRef> {
	return operation({
		context: siteRef.context,
		method: "GET",
		path: generatePath("/sites/{site-id}", siteRef),
		headers: {},
		body: null,
		responseTransform: (response) => {
			const site = response as Site;
			return {
				...site,
				...siteRef,
			};
		},
	});
}
