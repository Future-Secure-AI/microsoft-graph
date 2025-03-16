import { generatePath, type GraphRequest } from "../api.js";
import type { DriveItem } from "../models.js";
import type { DriveItemPath } from "./driveItem/DriveItemPath.js";
import type { DriveRef } from "./DriveRef.js";

/** Create folder if it doesn't exist, and return the folder. @see https://learn.microsoft.com/en-us/graph/api/driveitem-post-children */

export default function createFolder(driveRef: DriveRef, folderPath: DriveItemPath): GraphRequest<DriveItem> {
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
        }
    };
}
