import type { DriveItemPath } from "../../model/DriveItemPath.js";
import type { DriveRef } from "../../model/DriveRef.js";
import type { DriveItem } from "../../model/Dto.js";
import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import generatePath from "../../utils/generatePath.js";

/** Retrieve the metadata for an item in a drive by file path. If the target file is moved this will cease working. @see https://learn.microsoft.com/en-us/graph/api/driveitem-get */
export default function getDriveItemByPath(driveRef: DriveRef, itemPath: DriveItemPath, opts?: GraphOptions): GraphOperation<DriveItem> {
    return {
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}`, driveRef),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
