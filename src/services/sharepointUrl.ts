import type { HostName } from "../models/HostName.ts";
import type { SiteName } from "../models/Site.ts";

export type SharepointUrlComponents = {
	hostName: HostName | null;
	siteName: SiteName | null;
};

/**
 * Parses a SharePoint document URL string to extract the site name, host name, drive name and item ID if present.
 * @param urlString SharePoint URL as a string.
 * @returns An object containing the host name, site name, drive name, and item ID. Parameters are omitted if not found.
 */
export function parseSharepointUrl(urlString: string): SharepointUrlComponents {
	let url: URL;
	let hostName: HostName | null = null;
	let siteName: SiteName | null = null;

	try {
		url = new URL(urlString);
	} catch {
		return {
			hostName: null,
			siteName: null,
		};
	}

	if (!url.hostname.endsWith(".sharepoint.com")) {
		return {
			hostName: null,
			siteName: null,
		};
	}
	hostName = url.hostname as HostName;

	const pathSegments = url.pathname.split("/").filter(Boolean);
	const sitesIdx = pathSegments.findIndex((seg) => seg.toLowerCase() === "sites");
	if (sitesIdx !== -1 && pathSegments[sitesIdx + 1]) {
		const rawSiteName = pathSegments[sitesIdx + 1];
		siteName = rawSiteName ? (decodeURIComponent(rawSiteName) as SiteName) : null;
	}

	return {
		hostName,
		siteName,
	} satisfies SharepointUrlComponents;
}
