import { apiDelete, apiGet, apiGetRaw, apiPost } from "./api.js";
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

    let response = await apiGet<ListItemResponse>(`/sites/?/drives/?/root:${itemPath}:/children`, [driveRef.site, driveRef.drive]);
    output.push(...response.value);

    // eslint-disable-next-line no-undefined
    while (response["@odata.nextLink"] !== undefined) {
        // eslint-disable-next-line no-await-in-loop
        response = await apiGetRaw<ListItemResponse>(response["@odata.nextLink"]);
        output.push(...response.value);
    }

    return {
        "@odata.context": response["@odata.context"],
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
    apiPost("/sites/?/drives/?/items/?/copy", [srcFileRef.site, srcFileRef.drive, srcFileRef.item], {
        name: dstFileName,
        parentReference: {
            siteId: dstFolderRef.site,
            driveId: dstFolderRef.drive,
            id: dstFolderRef.item
        }
    }
    );