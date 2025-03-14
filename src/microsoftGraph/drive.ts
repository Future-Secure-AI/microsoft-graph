/** GraphAPI Drive bindings. NO NOT ADD BUSINESS OR MANIPULATION LOGIC HERE! */

import { apiGet } from "./api.js";
import type { DriveItem, Site } from "./models.d.ts";

export type HostName = string & { __brand: "Hostname" };

export type SiteId = string & { __brand: "SiteId" }; // SiteId is in the format `{hostname},{site-collection-id},{web-id}` and therefore implicity contains the hostname
export type SiteRef = { siteId: SiteId };
export type SiteName = string & { __brand: "SiteName" };

export type DriveId = string & { __brand: "DriveId" };
export type DriveRef = SiteRef & { driveId: DriveId };

export type ListDriveResponse = {
	"@odata.context": string;
	value: DriveItem[];
};

export type ListItemResponse = {
	"@odata.context": string;
	value: DriveItem[];
	"@odata.nextLink"?: string;
};

export type ListSitesReponse = {
	"@odata.context": string;
	value: Site[];
};

/** Find accessible sites that match keywords provided. @see https://learn.microsoft.com/en-us/graph/api/site-search */
export async function searchAvailableSites(search: string): Promise<ListSitesReponse> {
	return await apiGet<ListSitesReponse>("/sites?search={search}", { search }, []);
}

/** List sites that are available. @see https://learn.microsoft.com/en-us/graph/api/site-list */
export async function listAvailableSites(): Promise<Site[]> {
	return await apiGet<Site[]>("/sites", {}, []);
}

/** Retrieve properties for a site resource. @see https://learn.microsoft.com/en-us/graph/api/site-get */
export async function getSite(siteRef: SiteRef): Promise<Site> {
	return await apiGet<Site>("/sites/{site-id}", siteRef, []);
}

/** Get site by name. @see https://learn.microsoft.com/en-us/graph/api/site-getbypath */
export async function getSiteByName(hostName: HostName, siteName: SiteName): Promise<Site> {
	return await apiGet<Site>("/sites/{host-name}:/{site-name}", { hostName, siteName }, []);
}

