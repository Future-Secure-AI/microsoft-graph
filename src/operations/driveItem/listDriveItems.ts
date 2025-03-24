import type { DriveItem } from "@microsoft/microsoft-graph-types";
import InvalidArgumentError from "../../errors/InvalidArgumentError.ts";
import { operation } from "../../graphApi.ts";
import type { DriveItemId } from "../../models/DriveItemId.ts";
import type { DriveItemPath } from "../../models/DriveItemPath.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { driveItemRef } from "../../services/driveItem.ts";
import { generatePath } from "../../services/templatedPaths.ts";

export type ListDriveItemResponse = {
    "@odata.context": string;
    value: DriveItem[];
    "@odata.nextLink"?: string;
};

/** Retrieve the metadata for items in a drive by file path. @see https://learn.microsoft.com/en-us/graph/api/driveitem-list-children */
export default function listDriveItems(driveRef: DriveRef, itemPath: DriveItemPath): GraphOperation<(DriveItem & DriveItemRef)[]> {
    InvalidArgumentError.throwIfFalsy(itemPath.startsWith("/"), "Path must start with a slash.");

    const pathSegment = itemPath === "/" ? "" : `:${itemPath}:`;

    return operation({
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/root${pathSegment}/children`, driveRef),
        headers: {},
        body: null,
        responseTransform: response => {
            const list = response as ListDriveItemResponse;

            const items = list.value.map(item => {
                const itemRef = driveItemRef(driveRef, item.id as DriveItemId);

                return {
                    ...item,
                    ...itemRef,
                }
            });

            return items;
        }
    });
}