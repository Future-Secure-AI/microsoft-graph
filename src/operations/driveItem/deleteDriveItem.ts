/**
 * Delete an item from a drive.
 * @module deleteDriveItem
 * @category Operations
 */

import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Delete an item from a drive.
 * @param itemRef Reference to the drive item to be deleted.
 *  * @see https://learn.microsoft.com/en-us/graph/api/driveitem-delete
 */
export default function deleteDriveItem(itemRef: DriveItemRef): GraphOperation<void> {
	return operation({
		context: itemRef.context,
		method: "DELETE",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}", itemRef),
		headers: {},
		body: null,
		responseTransform: () => undefined,
	});
}
