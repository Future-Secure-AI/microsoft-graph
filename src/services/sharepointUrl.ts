import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import type { DriveItemId } from "../models/DriveItemId.ts";
import type { HostName } from "../models/HostName.ts";
import type { SiteName } from "../models/SiteName.ts";

/** Get the site name and item path from a given SharePoint document URL. (ie https://msftfuturesecureai.sharepoint.com/sites/FSAI-MQG/_layouts/15/doc.aspx?sourcedoc={500ff055-1e0f-4c2e-8b32-d167fba4778b} */
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
