import InvalidArgumentError from "./InvalidArgumentError.js";
import { apiDelete, apiGet, apiGetRaw, apiPost } from "./api.js";
import type { DriveItem, Site } from "./models.d.ts";

export type Hostname = string & { __brand: "Hostname" };

export type SiteId = string & { __brand: "SiteId" }; // NOTE: SiteId is in the format `{hostname},{site-collection-id},{web-id}` and therefore implicity contains the hostname
export type SiteRef = { site: SiteId };
export type SiteName = string & { __brand: "SiteName" };

export type DriveId = string & { __brand: "DriveId" };
export type DriveRef = SiteRef & { drive: DriveId };

export type ItemId = string & { __brand: "ItemId" };
export type ItemRef = DriveRef & { item: ItemId };
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

/**
 * Search across a SharePoint tenant for sites that match keywords provided.
 * https://learn.microsoft.com/en-us/graph/api/site-search
 */
export const searchAvailableSites = async (search: string): Promise<ListSitesReponse> =>
	apiGet<ListSitesReponse>("/sites\\?search=?", [search]);

/**
 * List all available sites in an organization.
 * https://learn.microsoft.com/en-us/graph/api/site-list
 */
export const listAvailableSites = async (): Promise<Site[]> =>
	apiGet<Site[]>("/sites", []);

/**
 * Retrieve properties for a site resource.
 * https://learn.microsoft.com/en-us/graph/api/site-get
 */
export const getSite = async (siteRef: SiteRef): Promise<Site> => 
	apiGet<Site>("/sites/?", [siteRef.site]);

/**
 * Get site by name.
 * https://learn.microsoft.com/en-us/graph/api/site-getbypath
 */
export const getSiteByName = async (hostname: Hostname, siteName: SiteName): Promise<Site> =>
	apiGet<Site>("/sites/?:/?", [hostname, siteName]);

/**
 * Retrieve the list of Drive resources available for a Site.
 * https://learn.microsoft.com/en-us/graph/api/drive-list
 */
export const listDrives = async (siteRef: SiteRef): Promise<ListDriveResponse> => 
	apiGet<ListDriveResponse>("/sites/?/drives", [siteRef.site]);

/**
 * Retrieve the metadata for an item in a drive by file path. NOTE: If the target file is moved this will cease working.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-get
 */
export const getItemByPath = async (driveRef: DriveRef, itemPath: ItemPath): Promise<DriveItem> => 
	apiGet<DriveItem>(`/sites/?/drives/?/root:${itemPath}`, [driveRef.site, driveRef.drive]);

/**
 * Retrieve the metadata for an item in a drive.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-get
 */
export const getItem = async (itemRef: ItemRef): Promise<DriveItem> => 
	apiGet<DriveItem>(`/sites/?/drives/?/items/?`, [itemRef.site, itemRef.drive, itemRef.item]);

/**
 * Retrieve the metadata for items in a drive by file path.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-list-children
 */
export const listItems = async (driveRef: DriveRef, itemPath: ItemPath): Promise<ListItemResponse> => {
	const output: DriveItem[] = [];

	let response = await apiGet<ListItemResponse>(`/sites/?/drives/?/root:${itemPath}:/children`, [driveRef.site, driveRef.drive]);
	output.push(...response.value);

	while (response["@odata.nextLink"] !== undefined) {
		response = await apiGetRaw<ListItemResponse>(response["@odata.nextLink"]);
		output.push(...response.value);
	}

	return {
		"@odata.context": response["@odata.context"],
		value: output,
	};
};

/**
 * Delete an item.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-delete
 */
export const deleteItem = async (itemRef: ItemRef): Promise<void> => 
	apiDelete("/sites /?/drives/?/items/?", [itemRef.site, itemRef.drive, itemRef.item]);

/**
 * Create folder if it doesn't exist, and return the folder.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-post-children
 */
export const createFolder = async (driveRef: DriveRef, folderPath: ItemPath): Promise<DriveItem> =>
	apiPost<DriveItem>(`/sites/?/drives/?/root:${folderPath}:/children`, [driveRef.site, driveRef.drive], {
		name: folderPath,
		folder: {},
		"@microsoft.graph.conflictBehavior": "rename", // Do nothing if already exists
	});

/**
 * Initiate a copy of an item.
 * NOTE The response from the API will only indicate that the copy operation was accepted or rejected, as the copy operation is performed asynchronously.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-copy
 */
export const copyItem = async (srcFileRef: ItemRef, dstFolderRef: ItemRef, dstFileName: string): Promise<void> =>
	apiPost("/sites/?/drives/?/items/?/copy", [srcFileRef.site, srcFileRef.drive, srcFileRef.item], {
		name: dstFileName,
		parentReference: {
			siteId: dstFolderRef.site,
			driveId: dstFolderRef.drive,
			id: dstFolderRef.item,
		},
	});

/**
 * Get a the site name and item path from a given SharePoint URL.
 * (ie https://lachlandev.sharepoint.com/sites/Nexus-Test/Shared%20Documents/Forms/AllItems.aspx?newTargetListUrl=%2Fsites%2FNexus%2DTest%2FShared%20Documents))
 */
export const parseUiUrl = (uiUrl: URL): { hostname: Hostname; siteName: SiteName; itemPath: ItemPath } => {
	if (!uiUrl.hostname.endsWith(".sharepoint.com")) throw new InvalidArgumentError("Invalid SharePoint URL. Must end with '.sharepoint.com'.");
	const hostname = uiUrl.hostname as Hostname;

	const pathMatch = uiUrl.pathname.match(/^\/sites\/([^\/]+)/);
	if (!pathMatch) throw new InvalidArgumentError("Invalid SharePoint URL. Must start with '/sites/'.");
	const siteName = pathMatch[1] as SiteName;

	const itemPath = (uiUrl.searchParams.get("viewPath") || uiUrl.searchParams.get("newTargetListUrl") || null) as ItemPath | null; // TODO: Not these params are correct
	if (!itemPath) throw new InvalidArgumentError("Invalid SharePoint URL. Path not found in parameters.");

	return {
		hostname,
		siteName,
		itemPath,
	};
};
