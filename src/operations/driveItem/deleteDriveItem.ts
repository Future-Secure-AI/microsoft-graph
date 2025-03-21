import { operation } from "../../graphApi.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Delete an item. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export default function deleteDriveItem(itemRef: DriveItemRef): GraphOperation<void> {
    return operation({
        method: "DELETE",
        path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}", itemRef),
        headers: {},
        body: null,
        responseTransform: () => undefined
    });
}
