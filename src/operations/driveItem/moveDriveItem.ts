/**
 * Moves a file to a new location in the same drive.
 * @module moveDriveItem
 * @category Operations
 */

import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Moves a file to a new location in the same drive.
 * @param srcFileRef Reference to the source file to be copied.
 * @param dstFolderRef Reference to the destination folder or site (if targeting root).
 * @param dstFileName Name of the copied file.
 *  * @see https://learn.microsoft.com/en-us/graph/api/driveitem-move
 */
export default function moveDriveItem(srcFileRef: DriveItemRef, dstFolderRef: DriveRef | DriveItemRef, dstFileName: string): GraphOperation<void> {
	return operation({
		context: srcFileRef.context,
		method: "PATCH",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}", srcFileRef),
		headers: {
			"content-type": "application/json",
		},
		body: {
			name: dstFileName,
			parentReference: {
				siteId: dstFolderRef.siteId,
				driveId: dstFolderRef.driveId,
				id: "itemId" in dstFolderRef ? dstFolderRef.itemId : "root",
			},
		},
		responseTransform: () => undefined,
	});
}
