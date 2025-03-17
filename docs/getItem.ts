import type { DriveItemRef } from "../src/microsoftGraph/drives/driveItem/DriveItemRef.js";
import type { DriveItem } from "../src/microsoftGraph/models/Dto.js";
import { type GraphOperation } from "../src/microsoftGraph/models/GraphOperation.js";
import { type GraphOptions } from "../src/microsoftGraph/models/GraphOptions.js";
import { generatePath } from "../src/microsoftGraph/services/templatedPaths.js";

/** Retrieve the metadata for an item in a drive. @see https://learn.microsoft.com/en-us/graph/api/driveitem-get */
export default function getItem(itemRef: DriveItemRef, opts?: GraphOptions): GraphOperation<DriveItem> {
    return {
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}`, itemRef),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
