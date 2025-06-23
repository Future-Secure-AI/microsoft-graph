/**
 * Utilities for parsing and extracting information from SharePoint URLs.
 * @module sharepointUrl
 * @category Services
 */

import type { DriveName } from "../models/Drive.ts";
import type { DriveItemId } from "../models/DriveItem.ts";
import type { HostName } from "../models/HostName.ts";
import type { SiteName } from "../models/Site.ts";

type SharepointUrlComponents = {
	hostName: HostName | null;
	siteName: SiteName | null;
	driveName: DriveName | null;
	itemId: DriveItemId | null;
};

/**
 * Parses a SharePoint document URL string to extract the site name, host name, drive name and item ID if present.
 * @param urlString SharePoint URL as a string.
 * @returns An object containing the host name, site name, drive name (if present), and item ID (if present).
 * @throws InvalidArgumentError if the URL is invalid or required components are missing.
 */
export function parseSharepointUrl(urlString: string): SharepointUrlComponents {
	let url: URL;
	let hostName: HostName | null = null;
	let siteName: SiteName | null = null;
	let driveName: DriveName | null = null;
	let itemId: DriveItemId | null = null;

	try {
		url = new URL(urlString);
	} catch {
		return {
			hostName: null,
			siteName: null,
			driveName: null,
			itemId: null,
		};
	}

	if (!url.hostname.endsWith(".sharepoint.com")) {
		return {
			hostName: null,
			siteName: null,
			driveName: null,
			itemId: null,
		};
	}
	hostName = url.hostname as HostName;

	const pathSegments = url.pathname.split("/").filter(Boolean);
	const sitesIdx = pathSegments.findIndex((seg) => seg.toLowerCase() === "sites");
	if (sitesIdx !== -1 && pathSegments[sitesIdx + 1]) {
		siteName = pathSegments[sitesIdx + 1] as SiteName;
		const afterSite = pathSegments[sitesIdx + 2];
		if (afterSite && afterSite.toLowerCase() !== "_layouts" && afterSite.toLowerCase() !== "forms") {
			driveName = afterSite as DriveName;
		}
	}

	const sourcedoc = url.searchParams.get("sourcedoc");
	if (sourcedoc) {
		itemId = decodeURIComponent(sourcedoc.replace(/[{}]/g, "")).toUpperCase() as DriveItemId;
	}

	return {
		hostName,
		siteName,
		driveName,
		itemId,
	} satisfies SharepointUrlComponents;
}
