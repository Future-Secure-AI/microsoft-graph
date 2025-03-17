import type { DriveItemRef } from "../src/microsoftGraph/drives/driveItem/DriveItemRef.js";
import { type GraphOptions } from "../src/microsoftGraph/GraphOptions.js";
import { type GraphRequest } from "../src/microsoftGraph/GraphRequest.js";
import type { DriveItem } from "../src/microsoftGraph/model/models.js";
import { generatePath } from "../src/microsoftGraph/utils/generatePath.js";

/** Retrieve the metadata for an item in a drive. @see https://learn.microsoft.com/en-us/graph/api/driveitem-get */
export default function getItem(itemRef: DriveItemRef, opts?: GraphOptions): GraphRequest<DriveItem> {
    return {
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}`, itemRef),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
