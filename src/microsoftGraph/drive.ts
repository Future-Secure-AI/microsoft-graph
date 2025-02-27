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
    apiGet<ListDriveResponse>("/sites/?/drives", [ref.site]);

/**
 * Retrieve the metadata for an item in a drive by file system path.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-get
 */
export const getItemByPath = async (driveRef: DriveRef, itemPath: ItemPath): Promise<DriveItem> =>
    apiGet<DriveItem>(`/sites/?/drives/?/root:${itemPath}`, [driveRef.site, driveRef.drive]);

/**
 * Retrieve the metadata for child items in a drive by file system path.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-list-children
 */
export const listItemChildenByPath = async (driveRef: DriveRef, itemPath: ItemPath): Promise<ListItemResponse> => {
    const output: DriveItem[] = []

    let url: string | undefined = `/sites/${encodeURIComponent(driveRef.site)}` + // NOTE: While this approach is effective, it is not clean. Do not replicate this if you can. Tidy this if you have a cleaner approach.
        `/drives/${encodeURIComponent(driveRef.drive)}` +
        `/root:${itemPath}:/children`;

    // eslint-disable-next-line no-undefined
    while (url !== undefined) {
        // eslint-disable-next-line no-await-in-loop
        const response: ListItemResponse = await apiGet<ListItemResponse>(url, []);
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
    apiDelete("/sites /?/drives/?/items/?", [ref.site, ref.drive, ref.item]);

/**
 * Create folder if it doesn't exist, and return the folder.
 * https://learn.microsoft.com/en-us/graph/api/driveitem-post-children
 */
export const createFolder = async (driveRef: DriveRef, folderPath: ItemPath): Promise<DriveItem> =>
    apiPost<DriveItem>(`/sites/?/drives/?/root:${folderPath}:/children`, [driveRef.site, driveRef.drive], {
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
    apiPost("/sites/?/drives/?/items/?/copy", [dstFolderRef.site, dstFolderRef.drive, dstFolderRef.item], {
        name: dstFileName,
        parentReference: {
            siteId: dstFolderRef.site,
            driveId: dstFolderRef.drive,
            id: dstFolderRef.item
        }
    }
    );