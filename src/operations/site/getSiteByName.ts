/**
 * Get a site by its name.
 * @module getSiteByName
 * @category Operations
 */

import type { Site } from "@microsoft/microsoft-graph-types";
import type { ContextRef } from "../../models/Context.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { HostName } from "../../models/HostName.ts";
import type { SiteId, SiteName, SiteRef } from "../../models/Site.ts";
import { operation } from "../../services/operationInvoker.ts";
import { createSiteRef } from "../../services/site.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Get a site by its name.
 * @param contextRef Reference to the context.
 * @param hostName Host name of the site.
 * @param siteName Name of the site.
 * @returns The specified site.
 * @see https://learn.microsoft.com/en-us/graph/api/site-getbypath
 */
export default function getSiteByName(contextRef: ContextRef, hostName: HostName, siteName: SiteName): GraphOperation<Site & SiteRef> {
	return operation({
		context: contextRef.context,
		method: "GET",
		path: generatePath("/sites/{host-name}:/sites/{site-name}", { hostName, siteName }),
		headers: {},
		body: null,
		responseTransform: (response: unknown) => {
			const site = response as Site;
			const siteId = site.id as SiteId;
			const siteRef = createSiteRef(contextRef, siteId);
			return {
				...site,
				...siteRef,
			};
		},
	});
}
