/** GraphAPI Drive Item bindings. NO NOT ADD BUSINESS OR MANIPULATION LOGIC HERE! */

import { apiDelete, apiGet, apiPost } from "../api.js";
import type { DriveItem } from "../models.js";
import type { DriveRef } from "./drive.js";

export type DriveItemId = string & { __brand: "DriveItemId" };
export type DriveItemRef = DriveRef & { itemId: DriveItemId };
export type DriveItemPath = string & { __brand: "DriveItemPath" };

export type ListDriveItemResponse = {
    "@odata.context": string;
    value: DriveItem[];
    "@odata.nextLink"?: string;
};

/** Retrieve the metadata for an item in a drive by file path. If the target file is moved this will cease working. @see https://learn.microsoft.com/en-us/graph/api/driveitem-get */
export async function getItemByPath(driveRef: DriveRef, itemPath: DriveItemPath): Promise<DriveItem> {
    return await apiGet<DriveItem>(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}`, driveRef, []);
}

/** Retrieve the metadata for an item in a drive. @see https://learn.microsoft.com/en-us/graph/api/driveitem-get */
export async function getItem(itemRef: DriveItemRef): Promise<DriveItem> {
    return await apiGet<DriveItem>(`/sites/{site-id}/drives/{drive-id}/items/{item-id}`, itemRef, []);
}

/** Retrieve the metadata for items in a drive by file path. @see https://learn.microsoft.com/en-us/graph/api/driveitem-list-children */
export async function listItems(driveRef: DriveRef, itemPath: DriveItemPath): Promise<ListDriveItemResponse> {
    const output: DriveItem[] = [];

    let response = await apiGet<ListDriveItemResponse>(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}:/children`, driveRef, []);
    output.push(...response.value);

    while (response["@odata.nextLink"] !== undefined) {
        response = (await apiGet(response["@odata.nextLink"], {}, [])) as ListDriveItemResponse;
        output.push(...response.value);
    }

    return {
        "@odata.context": response["@odata.context"],
        value: output,
    };
}

/** Delete an item. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export async function deleteItem(itemRef: DriveItemRef): Promise<void> {
    await apiDelete("/sites/{site-id}/drives/{drive-id}/items/{item-id}", itemRef, []);
}

/** Create folder if it doesn't exist, and return the folder. @see https://learn.microsoft.com/en-us/graph/api/driveitem-post-children */
export async function createFolder(driveRef: DriveRef, folderPath: DriveItemPath): Promise<DriveItem> {
    return await apiPost<DriveItem>(`/sites/{site-id}/drives/{drive-id}/root:${folderPath}:/children`, driveRef, [], {
        name: folderPath,
        folder: {},
        "@microsoft.graph.conflictBehavior": "rename", // Do nothing if already exists
    });
}

/** Initiate an asyncronous copy of an item. NOTE: The copied file may not be immediately available and polling is required. @see https://learn.microsoft.com/en-us/graph/api/driveitem-copy */
export async function copyItem(srcFileRef: DriveItemRef, dstFolderRef: DriveItemRef, dstFileName: string): Promise<void> {
    await apiPost("/sites/{site-id}/drives/{drive-id}/items/{item-id}/copy", srcFileRef, [], {
        name: dstFileName,
        parentReference: {
            siteId: dstFolderRef.siteId,
            driveId: dstFolderRef.driveId,
            id: dstFolderRef.itemId,
        },
    });
}
