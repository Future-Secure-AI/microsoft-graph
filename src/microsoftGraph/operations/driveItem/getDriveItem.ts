import type { DriveItemRef } from "../../models/DriveItemRef.js";
import type { DriveItem } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { GraphOptions } from "../../models/GraphOptions.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Retrieve the metadata for an item in a drive. @see https://learn.microsoft.com/en-us/graph/api/driveitem-get */
export default function getDriveItem(itemRef: DriveItemRef, opts?: GraphOptions): GraphOperation<DriveItem> {
    return {
        method: "GET",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}", itemRef),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
