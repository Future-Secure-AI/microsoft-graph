import type { DriveItemPath } from "../../model/DriveItemPath.js";
import type { DriveRef } from "../../model/DriveRef.js";
import type { GraphOperation } from "../../model/GraphOperation.js";
import type { GraphOptions } from "../../model/GraphOptions.js";
import type { DriveItem } from "../../model/models.js";
import generatePath from "../../utils/generatePath.js";

export type ListDriveItemResponse = {
    "@odata.context": string;
    value: DriveItem[];
    "@odata.nextLink"?: string;
};

/** Retrieve the metadata for items in a drive by file path. @see https://learn.microsoft.com/en-us/graph/api/driveitem-list-children */
export default function listDriveItems(driveRef: DriveRef, itemPath: DriveItemPath, opts?: GraphOptions): GraphOperation<ListDriveItemResponse> {
    return {
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}:/children`, driveRef),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
