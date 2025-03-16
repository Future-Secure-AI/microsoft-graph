import { generatePath, type GraphRequest } from "../api.js";
import type { DriveItem } from "../models.js";
import type { DriveItemRef } from "./driveItem/DriveItemRef.js";

/** Retrieve the metadata for an item in a drive. @see https://learn.microsoft.com/en-us/graph/api/driveitem-get */
export default function getItem(itemRef: DriveItemRef): GraphRequest<DriveItem> {
    return {
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}`, itemRef),
        headers: {},
        body: null
    };
}
