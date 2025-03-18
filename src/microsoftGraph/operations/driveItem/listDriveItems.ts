import InvalidArgumentError from "../../errors/InvalidArgumentError.js";
import type { DriveItemPath } from "../../models/DriveItemPath.js";
import type { DriveRef } from "../../models/DriveRef.js";
import type { DriveItem } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import { generatePath } from "../../services/templatedPaths.js";

export type ListDriveItemResponse = {
    "@odata.context": string;
    value: DriveItem[];
    "@odata.nextLink"?: string;
};

/** Retrieve the metadata for items in a drive by file path. @see https://learn.microsoft.com/en-us/graph/api/driveitem-list-children */
export default function listDriveItems(driveRef: DriveRef, itemPath: DriveItemPath): GraphOperation<ListDriveItemResponse> {
    if (!itemPath.startsWith("/")) {
        throw new InvalidArgumentError("Path template must start with a slash.");
    }

    const pathSegment = itemPath === "/" ? "" : `:${itemPath}:`;

    return {
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/root${pathSegment}/children`, driveRef),
        headers: {},
        body: null,
    };
}