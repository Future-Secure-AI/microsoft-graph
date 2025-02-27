import { apiDelete, apiGet, apiPost } from "./api.js";
import type { DriveItem, DriveRef, ItemPath, ItemRef, SiteRef } from "./models.js";

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
export const listDrives = async (ref: SiteRef): Promise<ListDriveResponse> =>
    apiGet<ListDriveResponse>([
        "sites", ref.site,
        "drives"
    ]);

/**
 * Retrieve the metadata for an item in a drive by file system path.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-get
 */
export const getItemByPath = async (driveRef: DriveRef, itemPath: ItemPath): Promise<DriveItem> =>
    apiGet<DriveItem>(
        `/sites/${encodeURIComponent(driveRef.site)}` +
        `/drives/${encodeURIComponent(driveRef.drive)}` +
        `/root:${itemPath}`); // `path` not escaped as it contains multiple segments

/**
 * Retrieve the metadata for child items in a drive by file system path.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-list-children
 */
export const listItemChildenByPath = async (driveRef: DriveRef, itemPath: ItemPath): Promise<ListItemResponse> => {
    const output: DriveItem[] = []

    let url: string | undefined = `/sites/${encodeURIComponent(driveRef.site)}` +
        `/drives/${encodeURIComponent(driveRef.drive)}` +
        `/root:${itemPath}:/children`; // `path` not escaped as it contains multiple segments

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
export const deleteItem = async (ref: ItemRef): Promise<void> =>
    apiDelete([
        "sites", ref.site,
        "drives", ref.drive,
        "items", ref.item
    ]);

/**
 * Create folder if it doesn't exist, and return the folder.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-post-children
 */
export const createFolder = async (driveRef: DriveRef, folderPath: ItemPath): Promise<DriveItem> => apiPost<DriveItem>(
    `/sites/${encodeURIComponent(driveRef.site)}` +
    `/drives/${encodeURIComponent(driveRef.drive)}` +
    `/root:${folderPath}:/children`,
    {
        name: folderPath,
        folder: {},
        "@microsoft.graph.conflictBehavior": "rename" // Do nothing if already exists
    });

/**
 * Create a copy of an item. 
 * NOTE: In many cases the copy action is performed asynchronously. The response from the API will only indicate that the copy operation was accepted or rejected.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-copy
 */
export const copyItem = async (srcFileRef: ItemRef, dstFolderRef: ItemRef, dstFileName: string): Promise<void> =>
    apiPost(
        [
            "sites", srcFileRef.site,
            "drives", srcFileRef.drive,
            "items", srcFileRef.item,
            "copy"
        ],
        {
            name: dstFileName,
            parentReference: {
                siteId: dstFolderRef.site,
                driveId: dstFolderRef.drive,
                id: dstFolderRef.item
            }
        }
    );