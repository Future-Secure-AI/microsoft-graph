/**
 * Initiate an asynchronous copy of an item.
 * @module initiateCopyDriveItem
 * @category Operations
 */

import { operation } from "../../graphApi.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Initiate an asynchronous copy of an item.
 * @param srcFileRef Reference to the source file to be copied.
 * @param dstFolderRef Reference to the destination folder or site (if targeting root).
 * @param dstFileName Name of the created file.
 * @returns Nothing. The copied file may not be immediately available, and polling is required.
 * @remarks The copied file may not be immediately available and polling is required. YOU PROBABLY WANT `copyDriveItem` INSTEAD.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-copy
 */
export default function initiateCopyDriveItem(srcFileRef: DriveItemRef, dstFolderRef: DriveRef | DriveItemRef, dstFileName: string): GraphOperation<void> {
	return operation({
		context: srcFileRef.context,
		method: "POST",
		path: generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/copy", srcFileRef),
		headers: {
			"content-type": "application/json",
		},
		body: {
			name: dstFileName,
			parentReference: {
				siteId: dstFolderRef.siteId,
				driveId: dstFolderRef.driveId,
				id: "itemId" in dstFolderRef ? dstFolderRef.itemId : undefined,
			},
		},
		responseTransform: () => undefined,
	});
}
