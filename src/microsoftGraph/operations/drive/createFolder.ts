import type { DriveItemPath } from "../../model/DriveItemPath.js";
import type { DriveRef } from "../../model/DriveRef.js";
import type { DriveItem } from "../../model/Dto.js";
import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import generatePath from "../../utils/generatePath.js";

/** Create folder if it doesn't exist, and return the folder. @see https://learn.microsoft.com/en-us/graph/api/driveitem-post-children */
export default function createFolder(driveRef: DriveRef, folderPath: DriveItemPath, opts?: GraphOptions): GraphOperation<DriveItem> {
    return {
        method: "POST",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/root:${folderPath}:/children`, driveRef),
        headers: {
            'content-type': 'application/json',
        },
        body: {
            name: folderPath,
            folder: {},
            "@microsoft.graph.conflictBehavior": "rename", // Do nothing if already exists
        },
        dependsOn: opts?.dependsOn,
    };
}
