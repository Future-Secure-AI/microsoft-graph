import { apiGet } from "./graphApi.js";

export type SiteId = string & { __brand: "SiteId" };
export type SiteReference = { site: SiteId };

export type DriveId = string & { __brand: "DriveId" };
export type DriveReference = SiteReference & { drive: DriveId }

export type ItemId = string & { __brand: "ItemId" };
export type ItemReference = DriveReference & { item: ItemId };

export type Path = string & { __brand: "Path" };

export type UserInfo = {
    id: string;
    displayName: string;
    email?: string;
};

export type SiteDefinition = {
    id: SiteId;
    name: string;
    createdDateTime: string; // ISO 8601 date string
    lastModifiedDateTime: string; // ISO 8601 date string
    webUrl: string;
};

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

export type ListSitesReponse = {
    "@odata.context": string;
    value: SiteDefinition[];
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
 * Search across a SharePoint tenant for sites that match keywords provided.
 * https://learn.microsoft.com/en-us/graph/api/site-search
 */
export const searchSites = async (search: string): Promise<ListSitesReponse> =>
    apiGet<ListSitesReponse>([
        "sites", `search=${search}`
    ]);

/**
 * Retrieve properties for a site resource.
 * https://learn.microsoft.com/en-us/graph/api/site-get
 */
export const getSite = async (site: SiteReference): Promise<SiteDefinition> =>
    apiGet<SiteDefinition>([
        "sites", site.site
    ]);

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
export const getItemByPath = async (drive: DriveReference, path: Path): Promise<ItemDefinition> =>
    apiGet<ItemDefinition>(
        `/sites/${encodeURIComponent(drive.site)}` +
        `/drives/${encodeURIComponent(drive.drive)}` +
        `/root:${path}`); // `path` not escaped as it contains multiple segments

/**
 * Retrieve the metadata for child items in a drive by file system path.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-list-children
 */
export const listItemChildenByPath = async (drive: DriveReference, path: Path): Promise<ListItemResponse> => {
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

