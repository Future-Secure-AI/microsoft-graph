/**
 * Retrieve the metadata for an item in a drive.
 * @module getDriveItem
 * @category Operations
 */

import type { DriveItem } from "@microsoft/microsoft-graph-types";
import type { DriveItemRef } from "../../models/DriveItem.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Retrieve the metadata for an item in a drive.
 * @param itemRef Reference to the drive item.
 * @returns The metadata of the specified drive item, including its reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-get
 */
export default function getDriveItem(itemRef: DriveItemRef): GraphOperation<DriveItem & DriveItemRef> {
	return operation({
		context: itemRef.context,
		method: "GET",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}", itemRef),
		headers: {},
		body: null,
		responseTransform: (response) => {
			const item = response as DriveItem;

			return {
				...item,
				...itemRef,
			};
		},
	});
}
