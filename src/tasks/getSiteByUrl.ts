import type { Site } from "@microsoft/microsoft-graph-types";
import type { ContextRef } from "../models/Context.ts";
import type { SiteRef } from "../models/Site.ts";
import getSiteByName from "../operations/site/getSiteByName.ts";
import { parseSharepointUrl } from "../services/sharepointUrl.ts";

/**
 * Retrieves a site from a SharePoint URL.
 *
 * @param contextRef Context reference containing authentication and environment information.
 * @param url SharePoint URL pointing to the site.
 * @returns A Promise that resolves to the Site object
 * @throws If the URL is invalid or the site cannot be found.
 */
export default async function getSiteByUrl(contextRef: ContextRef, url: string): Promise<Site & SiteRef> {
	const { hostName, siteName } = parseSharepointUrl(url);

	if (!hostName) {
		throw new Error("Invalid SharePoint URL: Host name is missing.");
	}
	if (!siteName) {
		throw new Error("Invalid SharePoint URL: Site name is missing.");
	}

	return await getSiteByName(contextRef, hostName, siteName);
}
