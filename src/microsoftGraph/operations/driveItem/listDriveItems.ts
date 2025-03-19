import InvalidArgumentError from "../../errors/InvalidArgumentError.js";
import { operation } from "../../graphApi.js";
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
    InvalidArgumentError.throwIfFalsy(itemPath.startsWith("/"), "Path must start with a slash.");

    const pathSegment = itemPath === "/" ? "" : `:${itemPath}:`;

    return operation({
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/root${pathSegment}/children`, driveRef),
        headers: {},
        body: null,
    });
}