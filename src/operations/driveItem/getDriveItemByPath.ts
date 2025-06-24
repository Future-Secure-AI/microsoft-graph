/**
 * Retrieve the metadata for an item in a drive by file path.
 * @module getDriveItemByPath
 * @category Operations
 */

import type { DriveItem } from "@microsoft/microsoft-graph-types";
import InvalidArgumentError from "../../errors/InvalidArgumentError.ts";
import type { DriveRef } from "../../models/Drive.ts";
import type { DriveItemId, DriveItemPath, DriveItemRef } from "../../models/DriveItem.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { createDriveItemRef } from "../../services/driveItem.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Retrieve the metadata for an item in a drive by file path.
 * @param driveRef Reference to the drive containing the item.
 * @param itemPath Path of the item within the drive.
 * @returns The metadata of the specified drive item, including its reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-get
 */
export default function getDriveItemByPath(driveRef: DriveRef, itemPath: DriveItemPath): GraphOperation<DriveItem & DriveItemRef> {
	if (!itemPath.startsWith("/")) {
		throw new InvalidArgumentError("itemPath must start with a forward slash (/)");
	}

	const normalizedPath = itemPath === "/" ? "/sites/{site-id}/drives/{drive-id}/root" : `/sites/{site-id}/drives/{drive-id}/root:${itemPath}`;

	return operation({
		context: driveRef.context,
		method: "GET",
		path: generatePath(normalizedPath, driveRef),
		headers: {},
		body: null,
		responseTransform: (response) => {
			const item = response as DriveItem;
			const itemRef = createDriveItemRef(driveRef, item.id as DriveItemId);

			return {
				...item,
				...itemRef,
			};
		},
	});
}
