import { generatePath, type GraphRequest } from "../api.js";
import type { DriveItemRef } from "./DriveItemRef.js";

/** Delete an item. @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete */
export default function deleteItem(itemRef: DriveItemRef): GraphRequest<void> {
    return {
        method: "DELETE",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}`, itemRef),
        headers: {},
        body: null
    };
}
