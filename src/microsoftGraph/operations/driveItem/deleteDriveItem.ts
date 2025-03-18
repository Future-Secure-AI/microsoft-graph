import type { DriveItemRef } from "../../models/DriveItemRef.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import { generatePath } from "../../services/templatedPaths.js";

/** Delete an item. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export default function deleteDriveItem(itemRef: DriveItemRef): GraphOperation<void> {
    return {
        method: "DELETE",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}", itemRef),
        headers: {},
        body: null,
    };
}
