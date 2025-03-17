import type { GraphOptions } from "../../GraphOptions.js";
import type { GraphRequest } from "../../GraphRequest.js";
import type { DriveItemPath } from "../../model/DriveItemPath.js";
import type { DriveItem } from "../../model/models.js";
import generatePath from "../../utils/generatePath.js";
import type { DriveRef } from "../DriveRef.js";

export type ListDriveItemResponse = {
    "@odata.context": string;
    value: DriveItem[];
    "@odata.nextLink"?: string;
};

/** Retrieve the metadata for items in a drive by file path. @see https://learn.microsoft.com/en-us/graph/api/driveitem-list-children */
export default function listDriveItems(driveRef: DriveRef, itemPath: DriveItemPath, opts?: GraphOptions): GraphRequest<ListDriveItemResponse> {
    return {
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}:/children`, driveRef),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
