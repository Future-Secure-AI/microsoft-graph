import { apiDelete, apiGet, apiPost } from "./graphApi.js";
import type { SiteReference, UserInfo } from "./sites.js";

export type DriveId = string & { __brand: "DriveId" };
export type DriveReference = SiteReference & { drive: DriveId }

export type ItemId = string & { __brand: "ItemId" };
export type ItemReference = DriveReference & { item: ItemId };
export type ItemPath = string & { __brand: "Path" };

export type DriveDefinition = {
    createdDateTime: string; // ISO 8601 date string
    description: string;
    id: string;
    lastModifiedDateTime: string; // ISO 8601 date string
    name: string;
    webUrl: string;
    driveType: string;
    createdBy: {
        user: UserInfo;
    };
    lastModifiedBy: {
        user: UserInfo;
    };
    owner: {
        user: UserInfo;
    };
    quota: {
        deleted: number;
        remaining: number;
        state: string;
        total: number;
        used: number;
    };
};

export type ItemDefinition = {
    id: string;
    lastModifiedBy: {
        user: UserInfo;
    };
    createdBy: {
        user: UserInfo;
    };
    createdDateTime: string; // ISO 8601 date string
    cTag: string;
    eTag: string;
    folder?: {
        childCount: number;
    };
    lastModifiedDateTime: string; // ISO 8601 date string
    name: string;
    root?: unknown;
    size: number;
    webUrl: string;
};

export type ListDriveResponse = {
    "@odata.context": string;
    value: DriveDefinition[];
};

export type ListItemResponse = {
    "@odata.context": string;
    value: ItemDefinition[];
    "@odata.nextLink"?: string;
};

/**
 * Retrieve the list of Drive resources available for a Site.
 * https://learn.microsoft.com/en-us/graph/api/drive-list
 */
export const listDrives = async (site: SiteReference): Promise<ListDriveResponse> =>
    apiGet<ListDriveResponse>([
        "sites", site.site,
        "drives"
    ]);

/**
 * Retrieve the metadata for an item in a drive by file system path.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-get
 */
export const getItemByPath = async (drive: DriveReference, path: ItemPath): Promise<ItemDefinition> =>
    apiGet<ItemDefinition>(
        `/sites/${encodeURIComponent(drive.site)}` +
        `/drives/${encodeURIComponent(drive.drive)}` +
        `/root:${path}`); // `path` not escaped as it contains multiple segments

/**
 * Retrieve the metadata for child items in a drive by file system path.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-list-children
 */
export const listItemChildenByPath = async (drive: DriveReference, path: ItemPath): Promise<ListItemResponse> => {
    const output: ItemDefinition[] = []

    let url: string | undefined = `/sites/${encodeURIComponent(drive.site)}` +
        `/drives/${encodeURIComponent(drive.drive)}` +
        `/root:${path}:/children`; // `path` not escaped as it contains multiple segments

    // eslint-disable-next-line no-undefined
    while (url !== undefined) {
        // eslint-disable-next-line no-await-in-loop
        const response: ListItemResponse = await apiGet<ListItemResponse>(url);
        url = response["@odata.nextLink"];
        output.push(...response.value);
    }

    return {
        "@odata.context": "",
        value: output,
    };
}

/**
 * Delete an item.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-delete
 */
export const deleteItem = async (item: ItemReference): Promise<void> =>
    apiDelete([
        "sites", item.site,
        "drives", item.drive,
        "items", item.item
    ]);

/**
 * Create folder if it doesn't exist, and return the folder.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-post-children
 */
export const createFolder = async (drive: DriveReference, path: ItemPath): Promise<ItemDefinition> => {
    const payload = {
        name: path,
        folder: {},
        "@microsoft.graph.conflictBehavior": "rename" // Do nothing if already exists
    };

    return apiPost<ItemDefinition>(`/sites/${encodeURIComponent(drive.site)}` +
        `/drives/${encodeURIComponent(drive.drive)}` +
        `/root:${path}:/children`, payload);
}