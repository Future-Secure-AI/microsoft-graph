import type { GraphOptions } from "../../GraphOptions.js";
import type { GraphRequest } from "../../GraphRequest.js";
import generatePath from "../../utils/generatePath.js";
import type { DriveItemRef } from "./DriveItemRef.js";

/** Delete an item. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export default function deleteDriveItem(itemRef: DriveItemRef, opts?: GraphOptions): GraphRequest<void> {
    return {
        method: "DELETE",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}`, itemRef),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
