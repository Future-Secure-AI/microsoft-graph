import type { DriveItemRef } from "../../model/DriveItemRef.js";
import type { DriveItem } from "../../model/Dto.js";
import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import generatePath from "../../utils/generatePath.js";

/** Retrieve the metadata for an item in a drive. @see https://learn.microsoft.com/en-us/graph/api/driveitem-get */
export default function getDriveItem(itemRef: DriveItemRef, opts?: GraphOptions): GraphOperation<DriveItem> {
    return {
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}`, itemRef),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
