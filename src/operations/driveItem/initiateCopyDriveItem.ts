import { operation } from "../../graphApi.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Initiate an asynchronous copy of an item. NOTE: The copied file may not be immediately available and polling is required.
 *
 * @param srcFileRef - A reference to the source file to be copied.
 * @param dstFolderRef - A reference to the destination folder.
 * @param dstFileName - The name of the copied file.
 * @returns Nothing. The copied file may not be immediately available, and polling is required.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-copy
 */
export default function initiateCopyDriveItem(srcFileRef: DriveItemRef, dstFolderRef: DriveItemRef, dstFileName: string): GraphOperation<void> {
	return operation({
		contextId: srcFileRef.contextId,
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
				id: dstFolderRef.itemId,
			},
		},
		responseTransform: () => undefined,
	});
}
