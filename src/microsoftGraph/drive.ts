import { apiDelete, apiGet, apiGetRaw, apiPost } from "./api.js";
import type { DriveItem } from "./models.d.ts";
import type { SiteRef } from "./site.js";

export type DriveId = string & { __brand: "DriveId" };
export type DriveRef = SiteRef & { drive: DriveId };

export type ItemId = string & { __brand: "ItemId" };
export type ItemRef = DriveRef & { item: ItemId };
export type ItemPath = string & { __brand: "Path" };

export type ListDriveResponse = {
	"@odata.context": string;
	value: DriveItem[];
};

export type ListItemResponse = {
	"@odata.context": string;
	value: DriveItem[];
	"@odata.nextLink"?: string;
};

/**
 * Retrieve the list of Drive resources available for a Site.
 * https://learn.microsoft.com/en-us/graph/api/drive-list
 */
export const listDrives = async (ref: SiteRef): Promise<ListDriveResponse> => apiGet<ListDriveResponse>("/sites/?/drives", [ref.site]);

/**
 * Retrieve the metadata for an item in a drive by file path. NOTE: If the target file is moved this will cease working.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-get
 */
export const getItemByPath = async (driveRef: DriveRef, itemPath: ItemPath): Promise<DriveItem> => apiGet<DriveItem>(`/sites/?/drives/?/root:${itemPath}`, [driveRef.site, driveRef.drive]);

/**
 * Retrieve the metadata for an item in a drive.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-get
 */
export const getItem = async (itemRef: ItemRef): Promise<DriveItem> => apiGet<DriveItem>(`/sites/?/drives/?/items/?`, [itemRef.site, itemRef.drive, itemRef.item]);

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
export const deleteItem = async (ref: ItemRef): Promise<void> => apiDelete("/sites /?/drives/?/items/?", [ref.site, ref.drive, ref.item]);

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
