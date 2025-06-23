/**
 * Retrieves a DriveRef from a SharePoint URL.
 * @module getDriveFromUrl
 * @category Tasks
 */

import type { Drive } from "@microsoft/microsoft-graph-types";
import type { ContextRef } from "../models/Context.ts";
import type { DriveRef } from "../models/Drive.ts";
import getSiteByName from "../operations/site/getSiteByName.ts";
import { parseSharepointUrl } from "../services/sharepointUrl.ts";
import iterateDrives from "./iterateDrives.ts";

/**
 * Retrieves a DriveRef from a SharePoint URL.
 *
 * Parses the given SharePoint URL to extract the host, site, and drive names, then locates and returns the corresponding Drive object.
 *
 * @param contextRef - The context reference containing authentication and environment information.
 * @param url - The SharePoint URL pointing to the drive.
 * @returns A Promise that resolves to the Drive object with additional DriveRef properties.
 * @throws If the URL is invalid or the drive cannot be found.
 */
export default async function getDriveFromUrl(contextRef: ContextRef, url: string): Promise<Drive & DriveRef> {
	const { hostName, siteName, driveName } = parseSharepointUrl(url);

	if (!hostName) {
		throw new Error("Invalid SharePoint URL: Host name is missing.");
	}
	if (!siteName) {
		throw new Error("Invalid SharePoint URL: Site name is missing.");
	}
	if (!driveName) {
		throw new Error("Invalid SharePoint URL: Drive name is missing.");
	}

	const site = await getSiteByName(contextRef, hostName, siteName);

	let drive: (Drive & DriveRef) | null = null;
	for await (const d of iterateDrives(site)) {
		if (sanitizeUrlName(d.name ?? "") === driveName) {
			drive = d;
		}
	}

	if (!drive) {
		throw new Error(`Drive "${driveName}" not found in site "${siteName}" on host "${hostName}".`);
	}

	return drive;
}

function sanitizeUrlName(name: string): string {
	return name.replace(/[^A-Za-z0-9\-_.~]/g, "");
}
