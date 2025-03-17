import type { DriveItemRef } from "../src/microsoftGraph/drives/driveItem/DriveItemRef.js";
import type { DriveItem } from "../src/microsoftGraph/model/Dto.js";
import { type GraphOperation } from "../src/microsoftGraph/model/GraphOperation.js";
import { type GraphOptions } from "../src/microsoftGraph/model/GraphOptions.js";
import { generatePath } from "../src/microsoftGraph/utils/generatePath.js";

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
