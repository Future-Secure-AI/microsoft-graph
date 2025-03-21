import { operation } from "../../graphApi.ts";
import type { DriveItemPath } from "../../models/DriveItemPath.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import type { DriveItem } from "../../models/Dto.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Retrieve the metadata for an item in a drive by file path. If the target file is moved this will cease working. @see https://learn.microsoft.com/en-us/graph/api/driveitem-get */
export default function getDriveItemByPath(driveRef: DriveRef, itemPath: DriveItemPath): GraphOperation<DriveItem> {
    return operation({
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}`, driveRef),
        headers: {},
        body: null,
        responseTransform: response => response as DriveItem
    });
}
