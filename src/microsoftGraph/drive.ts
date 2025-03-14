import InvalidArgumentError from "./InvalidArgumentError.js";
import { apiDelete, apiGet, apiPost } from "./api.js";
import type { DriveItem, Site } from "./models.d.ts";

export type Hostname = string & { __brand: "Hostname" };

export type SiteId = string & { __brand: "SiteId" }; // NOTE: SiteId is in the format `{hostname},{site-collection-id},{web-id}` and therefore implicity contains the hostname
export type SiteRef = { siteId: SiteId };
export type SiteName = string & { __brand: "SiteName" };

export type DriveId = string & { __brand: "DriveId" };
export type DriveRef = SiteRef & { driveId: DriveId };

export type ItemId = string & { __brand: "ItemId" };
export type ItemRef = DriveRef & { itemId: ItemId };
export type ItemPath = string & { __brand: "ItemPath" };

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

/** Search across a SharePoint tenant for sites that match keywords provided. @see https://learn.microsoft.com/en-us/graph/api/site-search */
export async function searchAvailableSites(search: string): Promise<ListSitesReponse> {
	return await apiGet<ListSitesReponse>("/sites?search={search}", { search }, []);
}

/** List all available sites in an organization. @see https://learn.microsoft.com/en-us/graph/api/site-list */
export async function listAvailableSites(): Promise<Site[]> {
	return await apiGet<Site[]>("/sites", {}, []);
}

/** Retrieve properties for a site resource. @see https://learn.microsoft.com/en-us/graph/api/site-get */
export async function getSite(siteRef: SiteRef): Promise<Site> {
	return await apiGet<Site>("/sites/{site-id}", siteRef, []);
}

/** Get site by name. @see https://learn.microsoft.com/en-us/graph/api/site-getbypath */
export async function getSiteByName(hostName: Hostname, siteName: SiteName): Promise<Site> {
	return await apiGet<Site>("/sites/{host-name}:/{site-name}", { hostName, siteName }, []);
}

/** Retrieve the list of Drive resources available for a Site. @see https://learn.microsoft.com/en-us/graph/api/drive-list */
export async function listDrives(siteRef: SiteRef): Promise<ListDriveResponse> {
	return await apiGet<ListDriveResponse>("/sites/{site-id}/drives", siteRef, []);
}

/** Retrieve the metadata for an item in a drive by file path. NOTE: If the target file is moved this will cease working. @see https://learn.microsoft.com/en-us/graph/api/driveitem-get */
export async function getItemByPath(driveRef: DriveRef, itemPath: ItemPath): Promise<DriveItem> {
	return await apiGet<DriveItem>(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}`, driveRef, []);
}

/** Retrieve the metadata for an item in a drive. @see https://learn.microsoft.com/en-us/graph/api/driveitem-get */
export async function getItem(itemRef: ItemRef): Promise<DriveItem> {
	return await apiGet<DriveItem>(`/sites/{site-id}/drives/{drive-id}/items/{item-id}`, itemRef, []);
}

/** Retrieve the metadata for items in a drive by file path. @see https://learn.microsoft.com/en-us/graph/api/driveitem-list-children */
export async function listItems(driveRef: DriveRef, itemPath: ItemPath): Promise<ListItemResponse> {
	const output: DriveItem[] = [];

	let response = await apiGet<ListItemResponse>(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}:/children`, driveRef, []);
	output.push(...response.value);

	while (response["@odata.nextLink"] !== undefined) {
		response = (await apiGet(response["@odata.nextLink"], {}, [])) as ListItemResponse;
		output.push(...response.value);
	}

	return {
		"@odata.context": response["@odata.context"],
		value: output,
	};
}

/** Delete an item. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export async function deleteItem(itemRef: ItemRef): Promise<void> {
	await apiDelete("/sites/{site-id}/drives/{drive-id}/items/{item-id}", itemRef, []);
}

/** Create folder if it doesn't exist, and return the folder. @see https://learn.microsoft.com/en-us/graph/api/driveitem-post-children */
export async function createFolder(driveRef: DriveRef, folderPath: ItemPath): Promise<DriveItem> {
	return await apiPost<DriveItem>(`/sites/{site-id}/drives/{drive-id}/root:${folderPath}:/children`, driveRef, [], {
		name: folderPath,
		folder: {},
		"@microsoft.graph.conflictBehavior": "rename", // Do nothing if already exists
	});
}

/** Initiate a copy of an item. NOTE The response from the API will only indicate that the copy operation was accepted or rejected, as the copy operation is performed asynchronously. @see https://learn.microsoft.com/en-us/graph/api/driveitem-copy */
export async function copyItem(srcFileRef: ItemRef, dstFolderRef: ItemRef, dstFileName: string): Promise<void> {
	await apiPost("/sites/{site-id}/drives/{drive-id}/items/{item-id}/copy", srcFileRef, [], {
		name: dstFileName,
		parentReference: {
			siteId: dstFolderRef.siteId,
			driveId: dstFolderRef.driveId,
			id: dstFolderRef.itemId,
		},
	});
}

/** Get the site name and item path from a given SharePoint URL. (ie https://lachlandev.sharepoint.com/sites/Nexus-Test/Shared%20Documents/Forms/AllItems.aspx?newTargetListUrl=%2Fsites%2FNexus%2DTest%2FShared%20Documents)) */
export function parseUiUrl(uiUrl: URL): { hostname: Hostname; siteName: SiteName; itemPath: ItemPath } { // TODO: Move to service
	if (!uiUrl.hostname.endsWith(".sharepoint.com")) {
		throw new InvalidArgumentError("Invalid SharePoint URL. Must end with '.sharepoint.com'.");
	}
	const hostname = uiUrl.hostname as Hostname;

	const pathMatch = uiUrl.pathname.match(/^\/sites\/([^\/]+)/);
	if (!pathMatch) {
		throw new InvalidArgumentError("Invalid SharePoint URL. Must start with '/sites/'.");
	}
	const siteName = pathMatch[1] as SiteName;

	const itemPath = (uiUrl.searchParams.get("viewPath") || uiUrl.searchParams.get("newTargetListUrl") || null) as ItemPath | null;
	if (!itemPath) {
		throw new InvalidArgumentError("Invalid SharePoint URL. Path not found in parameters.");
	}

	return {
		hostname,
		siteName,
		itemPath,
	};
}