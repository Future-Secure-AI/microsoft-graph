import type { Site } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { ContextRef } from "../../models/ContextRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { HostName } from "../../models/HostName.ts";
import type { SiteId } from "../../models/SiteId.ts";
import type { SiteName } from "../../models/SiteName.ts";
import type { SiteRef } from "../../models/SiteRef.ts";
import { createSiteRef } from "../../services/site.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Get a site by its name.
 *
 * @param contextRef - A reference to the context.
 * @param hostName - The host name of the site.
 * @param siteName - The name of the site.
 * @returns The specified site, including its metadata and reference information.
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
