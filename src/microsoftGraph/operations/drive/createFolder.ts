
import { operation } from "../../graphApi.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import type { DriveItem } from "../../models/Dto.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Create folder if it doesn't exist, and return the folder. Use a `DriveRef` to create in root or `DriveItemRef` to create in a subfolder. @see https://learn.microsoft.com/en-us/graph/api/driveitem-post-children */
export default function createFolder(parentRef: DriveRef | DriveItemRef, folderName: string): GraphOperation<DriveItem> {
    const pathSegment = (parentRef as DriveItemRef).itemId ? "items/{item-id}" : "root"

    return operation({
        method: "POST",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/${pathSegment}/children`, parentRef),
        headers: {
            "content-type": "application/json",
        },
        body: {
            name: folderName,
            folder: {},
            "@microsoft.graph.conflictBehavior": "rename", // Do nothing if already exists
        },
    });
}
