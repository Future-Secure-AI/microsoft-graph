import type { GraphOptions } from "../../api.js";
import { generatePath, type GraphRequest } from "../../api.js";
import type { DriveItem } from "../../models.js";
import type { DriveRef } from "../DriveRef.js";
import type { DriveItemPath } from "./DriveItemPath.js";

/** Retrieve the metadata for an item in a drive by file path. If the target file is moved this will cease working. @see https://learn.microsoft.com/en-us/graph/api/driveitem-get */
export default function getDriveItemByPath(driveRef: DriveRef, itemPath: DriveItemPath, opts?: GraphOptions): GraphRequest<DriveItem> {
    return {
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}`, driveRef),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
