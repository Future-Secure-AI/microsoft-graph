import type { DriveItemRef } from "../../models/DriveItemRef.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { GraphOptions } from "../../models/GraphOptions.js";
import generatePath from "../../services/generatePath.js";

/** Initiate an asyncronous copy of an item. NOTE: The copied file may not be immediately available and polling is required. @see https://learn.microsoft.com/en-us/graph/api/driveitem-copy */
export default function copyDriveItem(srcFileRef: DriveItemRef, dstFolderRef: DriveItemRef, dstFileName: string, opts?: GraphOptions): GraphOperation<void> {
    return {
        method: "POST",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/copy`, srcFileRef),
        headers: {
            'content-type': 'application/json',
        },
        body: {
            name: dstFileName,
            parentReference: {
                siteId: dstFolderRef.siteId,
                driveId: dstFolderRef.driveId,
                id: dstFolderRef.itemId,
            },
        },
        dependsOn: opts?.dependsOn,
    };
}
