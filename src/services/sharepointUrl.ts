import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { DriveItemId } from "../models/DriveItemId.ts";
import type { HostName } from "../models/HostName.ts";
import type { SiteName } from "../models/SiteName.ts";

/**
 * Parses a SharePoint document URL to extract the site name, host name, and item ID.
 * @param url - The SharePoint document URL.
 * @returns An object containing the host name, site name, and item ID.
 * @throws InvalidArgumentError if the URL is invalid or required components are missing.
 */
export function parseSharepointUrl(url: URL): { hostName: HostName; siteName: SiteName; itemId: DriveItemId } {
	if (!url.hostname.endsWith(".sharepoint.com")) {
		throw new InvalidArgumentError("Invalid SharePoint URL. Hostname must end with '.sharepoint.com'.");
	}
	const hostName = url.hostname as HostName;

	const pathSegments = url.pathname.split("/");
	const siteNameIndex = pathSegments.indexOf("sites") + 1;
	if (siteNameIndex <= 0 || !pathSegments[siteNameIndex]) {
		throw new InvalidArgumentError("Invalid SharePoint URL. Site name not found.");
	}
	const siteName = pathSegments[siteNameIndex] as SiteName;

	const sourcedoc = url.searchParams.get("sourcedoc");
	if (!sourcedoc) {
		throw new InvalidArgumentError("Invalid SharePoint URL. Path not found in parameters.");
	}

	const itemId = sourcedoc.replace(/[{}]/g, "").toLocaleUpperCase() as DriveItemId;

	return {
		hostName,
		siteName,
		itemId,
	};
}
