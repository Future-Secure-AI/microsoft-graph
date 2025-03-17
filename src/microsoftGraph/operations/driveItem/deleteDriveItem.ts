import type { DriveItemRef } from "../../model/DriveItemRef.js";
import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import generatePath from "../../utils/generatePath.js";

/** Delete an item. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export default function deleteDriveItem(itemRef: DriveItemRef, opts?: GraphOptions): GraphOperation<void> {
    return {
        method: "DELETE",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}`, itemRef),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
